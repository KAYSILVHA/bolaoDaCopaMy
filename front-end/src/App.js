import logo from './logo.svg';
import './App.css';
import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import Input from './components/Form/Input';
import { Scope } from '@unform/core';
import "./styles.css";
import axios from 'axios';
import ReactInputMask from "react-input-mask";


function App() {
  
const api = axios.create({
  baseURL: 'http://localhost:8080'
})
  const formRef = useRef(null);

  
  const response = useCallback(async ({logradouro, numero, referencia, cep, cidade, estado }) => {

    const result = await api.post('/api/salvarEndereco', {
      logradouro,
      numero, 
      referencia, 
      cep, 
      cidade, 
      estado
    })

    if(result.data.statusCodeValue === 201) {
      alert("Cadastro realizado com sucesso, boa sorte!")
    } else{
      alert(result.data.body);
    }
  }, []);

  function handleSubmit(data, { reset }) {
    if(data.formSenac.email === "") {
      alert("O e-mail é obrigatorio!")
      return;
    }

    if(data.formSenac.bilhete === "") {
      alert('Quantidade de bilhete deve ser informado')
      return;
    } else if(data.formSenac.bilhete <= 0) {
      alert('Numero de bilhetes deve ser maior que ' + data.formSenac.bilhete)
      return;
    }
    
    console.log(data);
    response(data.formSenac)
    reset(data);
    

  }

  return (
    <div className="App">
      <Form  ref={formRef} onSubmit={handleSubmit}>

        <Scope path='formSenac'>
          <Input name="logradouro" placeholder="Logradouro"/>
          <Input name="numero" placeholder="Numero da Casa"/>
          <Input name="referencia" placeholder="Referencia de endereço"/>
          <Input name="cep" placeholder="Informe o CEP"/>
          <Input name="cidade" placeholder="Nome da cidade"/>
          <Input name="estado" placeholder="Nome dos estado"/>
        
        </Scope>

        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
