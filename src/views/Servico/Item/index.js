import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ServicoItens = (props) => {
    // console.log(props.match.params.id);

    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItens = async () => {
        await axios.get(api + "/servico/"+id+"/pedidos")
        .then((response) => {
            console.log(response.data.item);
            setData(response.data.item);
        })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: "Erro: sem conexão com a API."
                })
                // console.log("Erro: sem conexão com a API.")
            })
    }

    useEffect(() => {
        getItens();
    },[id]);

    return (
        <div>
            <Container>
                <div>
                    <h1>Pedidos com o Serviço</h1>
                </div>
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID do Serviço</th>
                            <th>Pedido</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.ServicoId}>
                                <td>{item.ServicoId}</td>
                                <td>{item.PedidoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className="text-center/">
                                    <Link to={"/editar-item/"+item.ServicoId+"/"+item.PedidoId}
                                    className="btn btn-outline-warning btn-sm">
                                        Editar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};