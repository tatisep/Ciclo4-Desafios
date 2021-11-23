import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development"
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarCliente = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getClientes = async () => {
        await axios.get(api + "/clientes")
            .then((response) => {
                console.log(response.data.cli);
                setData(response.data.cli);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                });
                // console.log("Erro: sem conexão com a API.")
            });
    };

    
    const delClientes = async (idCliente) => {
        console.log(idCliente);

        const headers = {
            'content-type': 'application/json'
        }

        await axios.delete(api + "/excluirclientes/" + idCliente, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Cliente excluído com sucesso!'
                })
                console.log(response.data.type);
                console.log(response.data.message);
                getClientes();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: não foi possível conectar-se a API.'
                });
            });
    };

    useEffect(() => {
        getClientes();
    }, []);
    return (
        <div>
            <Container>
                <div className="p-2">
                    {status.type === 'error' ?
                        <Alert color="danger"> {status.message}</Alert> : ""}
                </div>
                <div className="d-flex">
                    <div>
                        <h1>Lista de Clientes</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrar-cliente"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                        <Link to="/"
                            className="btn btn-outline-primary btn-sm">Página Inicial</Link>
                    </div>
                </div>

                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
                
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Data de Nascimento</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>Cliente desde</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(cli => (
                            <tr key={cli.div}>
                                <th scope="row">{cli.id}</th>
                                <td>{cli.nome}</td>
                                <td>{cli.nascimento}</td>
                                <td>{cli.endereco}</td>
                                <td>{cli.cidade}</td>
                                <td>{cli.uf}</td>
                                <td>{cli.createdAt}</td>
                                <td><Link to={"/pedidos-clientes/" + cli.id}
                                    className="btn btn-outline-primary btn-sm">Consultar</Link>
                                    <Link to={"/editar-cliente/" + cli.id}
                                    className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => delClientes(cli.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </Table>
            </Container>
        </div>
    )
}