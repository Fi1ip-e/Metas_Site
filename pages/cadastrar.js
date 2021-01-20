import React, { useState } from 'react';
import { Jumbotron, Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import Menu from '../component/Menu';

function Cadastrar(){
    const [meta, setMeta] = useState({
        name: '',
        description: '',
        status: '',
    });

    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    })
    const onChangeInput = e => setMeta({...meta, [e.target.name]: e.target.value})
    const sendMeta = async e => {
        e.preventDefault();
        console.log(meta);

        setResponse({formSave: true});
        try {
        const res = await fetch("http://localhost:8081/meta", {
            method: 'POST',
            body: JSON.stringify(meta),
            headers: {'Content-Type': 'application/json'}
        })
        const respEnv = await res.json();

        if (respEnv.error){
            setResponse({
                formSave: false,
                type: 'error',
                message: respEnv.message,
            })
        }
        else {
            setResponse({
                formSave: false,
                type: 'success',
                message: respEnv.message,
            });
        }
    } catch (err) {
            setResponse({
                formSave: false,
                type: 'success',
                message: '',
            });
        }
    }
    return (
        <>
            <Menu />
            <Jumbotron fluid className="form">
                <Container>
                    <h1 className="display-4 text-center">Cadastrar minhas Metas</h1>
                    <hr />
                    {response.type === 'error' ? <Alert color="danger">{response.message}</Alert> : ""}
                    {response.type === 'success' ? <Alert color="success">{response.message}</Alert> : ""}
                    <Form onSubmit={sendMeta}>
                        <FormGroup>
                            <Label for="name">Nome:</Label>
                            <Input type="text" name="name" id="name" placeholder="Nome da meta" onChange={onChangeInput}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Descrição:</Label>
                            <Input type="text" name="description" id="description" placeholder="Descrição" onChange={onChangeInput}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="status">Status:</Label>
                            <Input type="text" name="status" id="status" placeholder="status da meta" onChange={onChangeInput}/>
                        </FormGroup>
                        {response.formSave ? <Button type="submit" color="danger" disabled>Envando...</Button>: <Button type="submit" outline>Cadastrar</Button>}
                    </Form>
                </Container>
            </Jumbotron>
        </>
    )
}

export default Cadastrar;