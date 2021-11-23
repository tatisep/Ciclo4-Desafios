import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarComprasItens = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItens = async () => {
        await axios.get(api+"/listaitemcompras")
            .then((response) => {
                console.log(response.data.itemCompras);
                setData(response.data.itemCompras)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: "Erro: sem conexão com a API."
                })
                // console.log("Erro: sem conexão com a API.")
            })
    }


    const delItem = async (CompraId, ProdutoId) => {
        
        const headers = {
            'content-type': 'application/json'
        }

        await axios.delete(api + "/excluiritemcompras/" + CompraId+"/" + ProdutoId, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Item da compra foi excluído com sucesso!'
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
                        <h1>Visualizar informações dos itens das compras</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrar-item-compra"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                </div>
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>CompraId</th>
                            <th>ProdutoId</th>
                            <th>quantidade</th>
                            <th>valor</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.CompraId}>
                                <td>{item.CompraId}</td>
                                <td>{item.ProdutoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className="text-center/">
                                    <Link to={"/editar-item-compra/"+item.CompraId+"/"+item.ProdutoId}
                                        className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => delItem(item.CompraId, item.ProdutoId)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};