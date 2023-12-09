import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './style.css';
import Item_extrato from '../../components/Item_extrato';
import Campo_texto from '../../components/Campo_texto';
import axios from 'axios';

export default function Home() {

    const location = useLocation();
    const clienteId = location.state?.id_cliente || null;

    const [saldo, setSaldo] = useState(0)
    const [input, setInput] = useState()
    const [extrato, setExtrato] = useState([]);
    const [nome, setNome] = useState('')
    let valor = ''

    function mostrar_extrato() {
        return extrato.map((item, index) => (
            <Item_extrato index={index} tipo={item.tipo} valor={item.valor} />
        ));
    }

    function saldo_atualizado() {
        const total = extrato.reduce((acc, item) => acc + item.valor, 0);
        setSaldo(total)
    }
    function aoDigitar(valorDoFilho) {
        valor = valorDoFilho;
        setInput(valor)
    }
    function depositar(valor) {
        valor = parseFloat(valor)
        if (valor > 0) {
            axios.post(`http://localhost:8080/operacoes/cliente/${clienteId}`, {
                tipo: "Depósito",
                valor: valor
            })
            setTimeout(() => {
                pegar_extrato_db()
            }, 250);
            setInput('')
        } else {
            setInput('')
        }
    }
    function sacar(valor) {
        if (valor > 0 && saldo > valor) {
            valor = (parseFloat(valor) * -1)
            axios.post(`http://localhost:8080/operacoes/cliente/${clienteId}`, {
                tipo: "Saque",
                valor: valor
            })
            setTimeout(() => {
                pegar_extrato_db()
            }, 250);
            setInput('')
        } else {
            setInput('')
        }
    }
    function limpar() {
        setInput('')
    }
    function pegar_extrato_db() {
        axios.get(`http://localhost:8080/operacoes/cliente/${clienteId}`)
            .then(response => {
                setExtrato(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(clienteId)
                console.log("pediu mal", error);
            });
    }
    function pegar_nome() {
        if (clienteId) {
            axios.get(`http://localhost:8080/clientes/${clienteId}`)
                .then(response => {
                    const nomeDoCliente = response.data.nome;
                    setNome(nomeDoCliente);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    
    useEffect(() => {
        pegar_nome();
    }, [clienteId]);

    useEffect(() => {
        saldo_atualizado();
    }, [extrato]);

    useEffect(() => {
        pegar_extrato_db()
    }, [])

  

    return (
        <>
            <div className='nome'>Olá, {nome}</div>
            <div className='container_home'>
                <div className='operacoes'>
                    <div className='saldo'>
                        Saldo: R${saldo}
                    </div>
                    <div>
                        Valor: R$ <Campo_texto
                            type='number'
                            placeholder='Valor...'
                            required={true}
                            onChange={aoDigitar}
                            value={input} />
                        <button className='limpar' onClick={limpar}>Limpar</button>
                    </div>
                    <div className='botoes'>
                        <button className='depositar' onClick={() => depositar(input)}>Depositar</button>
                        <button className='sacar' onClick={() => sacar(input)}>Sacar</button>
                    </div>
                </div>
                <div className='extrato'>
                    {mostrar_extrato()}
                </div>
            </div></>
    );
}