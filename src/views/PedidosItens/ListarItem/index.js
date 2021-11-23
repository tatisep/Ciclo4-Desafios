import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarPedidosItens = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItens = async () => {
        await axios.get(api+"/listaitempedidos")
            .then((response) => {
                console.log(response.data.itemPedidos);
                setData(response.data.itemPedidos)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: "Erro: sem conexão com a API."
                })
                // console.log("Erro: sem conexão com a API.")
            })
    }


    const delItem = async (PedidoId, ServicoId) => {
        
        const headers = {
            'content-type': 'application/json'
        }

        await axios.delete(api + "/excluiritempedidos/" + PedidoId+"/" + ServicoId, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Item do pedido foi excluído com sucesso!'
                })
                console.log(response.data.type);
                console.log(response.data.message);
                getItens();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: não foi possível conectar-se a API.'
                });
            });
    };

    useEffect(() => {
        getItens();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações dos itens dos pedidos</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrar-item-pedido"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                </div>
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>PedidoId</th>
                            <th>ServicoId</th>
                            <th>quantidade</th>
                            <th>valor</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.PedidoId}>
                                <td>{item.PedidoId}</td>
                                <td>{item.ServicoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className="text-center/">
                                    <Link to={"/editar-item/"+item.ServicoId+"/"+item.PedidoId}
                                        className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => delItem(item.PedidoId, item.ServicoId)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};