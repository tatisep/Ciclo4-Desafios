import axios from "axios";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarServico = (props) => {

    const [id, setId] = useState(props.match.params.id);
    
    const [servicoDados, setServicoDados] = useState({
        nome: '',
        descricao: ''
    })


    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setServicoDados({...servicoDados,[e.target.name]:e.target.value})

    const editServico = async e => {
        e.preventDefault();
        console.log(servicoDados)

        const headers = {
            'content-type': 'application/json'
        }

        await axios.put(`${api}/atualizaservicos`, { id, servicoDados }, { headers })
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
        const getServicos = async () => {
            await axios(api + "/servico/" + id)
                .then((response) => {
                    setServicoDados(response.data.servicos);
                    console.log(response.data)
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getServicos();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Serviço</h1>
                    </div>
                    <div className="p-2">
                        <a href="/listar-servicos" className="btn btn-outline-success btn-sm">Serviços</a>
                    </div>
                </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">
                        {status.message}</Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">
                        {status.message}</Alert> : " "}
                <Form className="p-2" onSubmit={editServico}>
                    <FormGroup className="p-2">
                        <Label>
                            Nome do Serviço
                        </Label>
                        <Input
                            name="nome"
                            placeholder="nome do serviço"
                            type="text"
                            value={servicoDados.nome}
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Descrição
                        </Label>
                        <Input
                            name="descricao"
                            placeholder="descrição"
                            type="text"
                            value={servicoDados.descricao}
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