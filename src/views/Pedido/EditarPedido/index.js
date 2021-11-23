import axios from "axios";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarPedido = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const editPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/pedido/" + id,
            { id, data, ClienteId }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Alteração feita com sucesso.'
                })
                console.log(response.data.type);
                console.log(response.data.message);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível acessar a API.'
                });
            });
    };

    useEffect(() => {
        const getPedido = async () => {
            await axios(api + "/pedido/" + id)
                .then((response) => {
                    setId(response.data.pedidos.id);
                    setData(response.data.pedidos.dataPedido);
                    setClienteId(response.data.pedidos.ClienteId);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getPedido();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Pedido</h1>
                    </div>
                    <div className="p-2">
                        <a href="/listar-pedidos" className="btn btn-outline-success btn-sm">Pedidos</a>
                    </div>
                </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">
                        {status.message}</Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">
                        {status.message}</Alert> : " "}
                    <Form className="p-2" onSubmit={editPedido}>
                        <FormGroup className="p-2">
                            <Label>
                                ID do Pedido
                            </Label>
                            <Input
                                name="id"
                                placeholder="id do pedido"
                                type="text"
                                defaultValue={id}
                            />
                        </FormGroup>
                        <FormGroup className="p-2">
                            <Label>
                                Data do Pedido
                            </Label>
                            <Input
                                name="data"
                                placeholder="data do pedido"
                                type="text"
                                value= {data}
                                onChange={e => setData(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="p-2">
                            <Label>
                                ID do Cliente
                            </Label>
                            <Input
                                name="ClienteId"
                                placeholder="id do cliente"
                                type="text"
                                defaultValue={ClienteId}
                            />
                        </FormGroup>
                        <Button type="submit" outline color="warning">
                            Salvar
                        </Button>
                        <Button type="reset" outline color="primary">
                            Limpar
                        </Button>
                    </Form>
            </Container >
        </div >
    );
};