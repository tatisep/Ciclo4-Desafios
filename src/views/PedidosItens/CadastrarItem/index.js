import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const CadastrarItemPedido = () => {

    const [itemPedido, setItemPedido] = useState({
        PedidoId:'',
        ServicoId:'',
        quantidade: '',
        valor: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setItemPedido({...itemPedido, [e.target.name]: e.target.value})

    const cadItem = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/itempedidos", itemPedido, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: response.data.message
                })
                console.log(response.data.message)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                console.log("Erro: sem conexão com a API.")
            });
    }

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Novo Item Pedido</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-pedidos-itens"
                            className="btn btn-outline-success btn-sm">Itens Pedidos</Link>
                    </div>
                </div>

                <hr className="m-1" />

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={cadItem}>
                    <FormGroup className="p-2">
                        <Label>
                            PedidoId
                        </Label>
                        <Input
                            name="PedidoId"
                            placeholder="digite o id do pedido"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            ServicoId
                        </Label>
                        <Input
                            name="ServicoId"
                            placeholder="informe o id do serviço"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Quantidade
                        </Label>
                        <Input
                            name="quantidade"
                            placeholder="informe a quantidade de itens pedidos"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Valor
                        </Label>
                        <Input
                            name="valor"
                            placeholder="informe o valor dos itens pedidos"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <Button type="submit" outline color="primary">
                        Cadastrar
                    </Button>
                    <Button type="reset" outline color="primary">
                        Limpar
                    </Button>
                </Form>
            </Container>

        </div>
    )
}