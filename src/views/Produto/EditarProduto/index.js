import axios from "axios";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarProduto = (props) => {

    const [id, setId] = useState(props.match.params.id);
    
    const [produtoDados, setProdutoDados] = useState({
        nome: '',
        descricao: ''
    })


    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setProdutoDados({...produtoDados,[e.target.name]:e.target.value})

    const editProduto = async e => {
        e.preventDefault();
        console.log(produtoDados)

        const headers = {
            'content-type': 'application/json'
        }

        await axios.put(`${api}/atualizaprodutos`, { id, produtoDados }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: response.data.message
                })
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: "Não foi possível acessar API."
                });
            });
    };


    useEffect(() => {
        const getProdutos = async () => {
            await axios(api + "/produto/" + id)
                .then((response) => {
                    setProdutoDados(response.data.produtos);
                    console.log(response.data.produtos)
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getProdutos();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Produto</h1>
                    </div>
                    <div className="p-2">
                        <a href="/listar-produtos" className="btn btn-outline-success btn-sm">Produtos</a>
                    </div>
                </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">
                        {status.message}</Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">
                        {status.message}</Alert> : " "}
                <Form className="p-2" onSubmit={editProduto}>
                    <FormGroup className="p-2">
                        <Label>
                            Nome do Produto
                        </Label>
                        <Input
                            name="nome"
                            placeholder="nome do produto"
                            type="text"
                            value={produtoDados.nome}
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Descrição
                        </Label>
                        <Input
                            name="descricao"
                            placeholder="descrição do produto"
                            type="text"
                            value={produtoDados.descricao}
                            onChange={valorInput}
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