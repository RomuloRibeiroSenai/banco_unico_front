import React, { useState } from 'react';
import Campo_texto from '../../components/Campo_texto';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';


export default function Inicio() {

    let valor = ''
    const [valor_login, setValor_login] = useState('');
    const [valor_senha, setValor_senha] = useState('');
    const [id_cliente, setId_cliente] = useState()
    const navigate = useNavigate();

    function limpar_campos() {
        setValor_login('')
        setValor_senha('')
    }
    function confirmacao() {
        navigate('/home')
    }

    function aoDigitar(valorDoFilho) {
        valor = valorDoFilho;
        setValor_login(valor)
    }
    function aoDigitar_senha(valorDoFilho) {
        valor = valorDoFilho;
        setValor_senha(valor)
    }
    function logar(login, senha) {
        axios.post('http://localhost:8080/clientes/login', {
            login: login,
            senha: senha
        })
        .then(response => {
            const clienteId = response.data;
            setId_cliente(clienteId);
            if (clienteId != null) {
                navigate('/home', { state: { id_cliente: clienteId } });
            }
        })
        .catch(error => {
            console.error('nao logou', error);
            
        });
    }
    

    return (
        <section>
            <div><h1 className='titulo'>Banco Unico</h1></div>
            <div className='caixa_login'>
                <div className='login'>
                    Login: <Campo_texto label='Login'
                        type='text'
                        placeholder='Digite seu login...'
                        onChange={aoDigitar}
                        value={valor_login} />
                    Senha: <Campo_texto label='Senha'
                        type='password'
                        placeholder='Digite sua senha...'
                        onChange={aoDigitar_senha}
                        value={valor_senha} />
                    <div className='botoes_login'>
                        <button className='botao_confirmar' onClick={() => logar(valor_login, valor_senha)}>Confirmar</button>
                        <button className='botao_limpar' onClick={limpar_campos}>Limpar</button>
                    </div>
                </div>
            </div>
        </section>

    );
}