import axios from "axios";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarItemPedido = (props) => {

    const [PedidoId, setPedidoId] = useState(props.match.params.PedidoId);
    const [ServicoId, setServicoId] = useState(props.match.params.ServicoId);
    const [itemPedido, setItemPedido] = useState({
        quantidade: '',
        valor: ''
    });

    const [quantidade, setQuantidade] = useState()
    const [valor, setValor] = useState()

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setItemPedido({...itemPedido, [e.target.name]: e.target.value})

    const editItem = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(`${api}/atualizaitempedidos/${PedidoId}/${ServicoId}`, 
            { quantidade, valor }, { headers })
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
        const getItem = async () => {
            await axios(`${api}/listar-item-pedido/${PedidoId}/${ServicoId}`)
                .then((response) => {
                    console.log(response.data.item)
                    console.log(response.data.item[0].quantidade)
                    setQuantidade(response.data.item[0].quantidade);
                    setValor(response.data.item[0].valor)
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getItem();
    }, [PedidoId, ServicoId]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Item do Pedido</h1>
                    </div>
                    <div className="p-2">
                        <a href="/listar-pedidos-itens" className="btn btn-outline-success btn-sm">Itens Pedidos</a>
                    </div>
                </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">
                        {status.message}</Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">
                        {status.message}</Alert> : " "}
                    <Form className="p-2" onSubmit={editItem}>
                    <FormGroup className="p-2">
                        <Label>
                            Quantidade
                        </Label>
                        <Input
                            name="quantidade"
                            placeholder="informe a quantidade de itens pedidos"
                            type="text"
                            value={quantidade}
                            onChange={e=>setQuantidade(e.target.value)}
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
                            value={valor}
                            onChange={e=>setValor(e.target.value)}
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