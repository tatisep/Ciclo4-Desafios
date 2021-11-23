import axios from "axios";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarCliente = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');


    const [clienteDados, setClienteDados] = useState({
        nome: '',
        endereco: '',
        cidade: '',
        uf: '',
        nascimento: '',
    })


    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setClienteDados({...clienteDados,[e.target.name]:e.target.value})

    const editCliente = async e => {
        e.preventDefault();
        console.log(clienteDados)

        const headers = {
            'content-type': 'application/json'
        }

        await axios.put(`${api}/atualizaclientes`, { id, clienteDados }, { headers })
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
        const getCliente = async () => {
            await axios(api + "/cliente/" + id)
                .then((response) => {
                    setClienteDados(response.data.cli);
                    console.log(response.data)
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getCliente();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Cliente</h1>
                    </div>
                    <div className="p-2">
                        <a href="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</a>
                    </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">
                        {status.message}</Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">
                        {status.message}</Alert> : " "}
                </div>
                <Form className="p-2" onSubmit={editCliente}>
                    <FormGroup className="p-2">
                        <Label>
                            Nome do Cliente
                        </Label>
                        <Input
                            name="nome"
                            placeholder="nome do cliente"
                            type="text"
                            value={clienteDados.nome}
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Data de Nascimento
                        </Label>
                        <Input
                            name="nascimento"
                            placeholder="data de nascimento"
                            type="text"
                            value={clienteDados.nascimento}
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Endereço
                        </Label>
                        <Input
                            name="endereco"
                            placeholder="endereco do cliente"
                            type="text"
                            value={clienteDados.endereco}
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Cidade
                        </Label>
                        <Input
                            name="cidade"
                            placeholder="cidade do cliente"
                            type="text"
                            value={clienteDados.cidade}
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            UF
                        </Label>
                        <Input
                            name="uf"
                            placeholder="uf do cliente"
                            type="text"
                            value={clienteDados.uf}
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