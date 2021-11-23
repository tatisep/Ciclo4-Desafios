import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const CadastrarCompra = () => {

    const [compra, setCompra] = useState({
        data:'',
        ClienteId:''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCompra({...compra, [e.target.name]: e.target.value})

    const cadCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/compras", compra, { headers })
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
                        <h1>Nova Compra</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-compras"
                            className="btn btn-outline-success btn-sm">Compras</Link>
                    </div>
                </div>

                <hr className="m-1" />

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={cadCompra}>
                    <FormGroup className="p-2">
                        <Label>
                            Id do Cliente
                        </Label>
                        <Input
                            name="ClienteId"
                            placeholder="digite o id do cliente"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Data da Compra
                        </Label>
                        <Input
                            name="data"
                            placeholder="informe a data da compra"
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