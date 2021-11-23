import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarPedido = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedidos = async () => {
        await axios.get(api+"/listapedidos")
            .then((response) => {
                console.log(response.data);
                setData(response.data.pedidos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: "Erro: sem conexão com a API."
                })
                // console.log("Erro: sem conexão com a API.")
            })
    }


    const delPedidos = async (id) => {
        console.log(id);

        const headers = {
            'content-type': 'application/json'
        }

        await axios.delete(api + "/excluirpedidos/" + id, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Pedido excluído com sucesso!'
                })
                console.log(response.data.type);
                console.log(response.data.message);
                getPedidos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: não foi possível conectar-se a API.'
                });
            });
    };

    useEffect(() => {
        getPedidos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações do pedido</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrar-pedido"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                </div>
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Id do Cliente</th>
                            <th>Data do Pedido</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.ClienteId}</td>
                                <td>{item.dataPedido}</td>
                                <td className="text-center/">
                                    <Link to={"/pedido-itens/"+item.id}
                                        className="btn btn-outline-primary btn-sm">Consultar</Link>
                                    <Link to={"/editar-pedido/" + item.id}
                                        className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => delPedidos(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};