import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";

export const PedidosCliente = (props) => {
    // console.log(props.match.params.id)

    const [dataPedido, setDataPedido] = useState([]);
    const [dataCompra, setDataCompra] = useState([])


    const [id] = useState(props.match.params.id)

    useEffect(() => {
        const getPedidos = async () => {
            await axios.get(api + "/cliente/" + id + "/pedidos")
                .then((response) => {
                    console.log(response.data.pedidos);
                    setDataPedido(response.data.pedidos);
                })
                .catch(() => {
                    console.log("Erro: sem conexão com a API.")
                })
        }

        const getCompras = async () => {
            await axios.get(api + "/cliente/" + id + "/compras")
                .then((response) => {
                    console.log(response.data.compras);
                    setDataCompra(response.data.compras);
                })
                .catch(() => {
                    console.log("Erro: sem conexão com a API.")
                })
        }
        getPedidos();
        getCompras();
    }, [id])

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Atividades do Cliente</h1>
                    </div>
                    <div className="p-2">
                        <a href="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</a>
                    </div>
                </div>
                <div>
                    <h1>Pedidos</h1>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ClienteID</th>
                            <th>Data</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataPedido.map(pedidos => (
                            <tr key={pedidos.id}>
                                <td>
                                    {pedidos.id}
                                </td>
                                <td>
                                    {pedidos.ClienteId}
                                </td>
                                <td>
                                    {pedidos.dataPedido}
                                </td>
                                <td>
                                    <Link to ={"/editar-pedido/"+pedidos.id}
                                    className = "btn btn-outline-warning btn-sm">Editar</Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
                <div>
                    <h1>Compras</h1>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ClienteID</th>
                            <th>Data</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataCompra.map(compras => (
                            <tr key={compras.id}>
                                <td>
                                    {compras.id}
                                </td>
                                <td>
                                    {compras.ClienteId}
                                </td>
                                <td>
                                    {compras.data}
                                </td>
                                <td>
                                    <Link to ={"/editar-compra/"+compras.id}
                                    className = "btn btn-outline-warning btn-sm">Editar</Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </Container >
        </div >
    );
};