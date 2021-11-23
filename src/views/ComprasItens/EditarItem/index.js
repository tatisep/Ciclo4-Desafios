import axios from "axios";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarItemCompra = (props) => {

    const [CompraId, setCompraId] = useState(props.match.params.CompraId);
    const [ProdutoId, setProdutoId] = useState(props.match.params.ProdutoId);
    const [itemCompra, setItemCompra] = useState({
        quantidade: '',
        valor: ''
    });

    const [quantidade, setQuantidade] = useState()
    const [valor, setValor] = useState()

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const editItem = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(`${api}/atualizaitemcompras/${CompraId}/${ProdutoId}`, 
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
            await axios(`${api}/listar-item-compra/${CompraId}/${ProdutoId}`)
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
    }, [CompraId, ProdutoId]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Item</h1>
                    </div>
                    <div className="p-2">
                        <a href="/listar-compras-itens" className="btn btn-outline-success btn-sm">Listar Itens</a>
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
                            placeholder="informe a quantidade de itens comprados"
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
                            placeholder="informe o valor dos itens comprados"
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