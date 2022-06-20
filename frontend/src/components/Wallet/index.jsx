import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AccountSummary } from './AccountSummary'
import { Transfer } from './Transfer'
import useAuth from "../../hooks/useAuth"
import Card from 'react-bootstrap/Card'
import axios from '../../api/axios'

const USUARIO_URL = '/usuario'

export const Wallet = ({actoin}) => {

    const { auth } = useAuth();

    const location = useLocation();
    const [nome, setNome] = useState('');
    const [login, setLogin] = useState('');
    const [saldo, setSaldo] = useState('');

    useEffect(() => {
        console.log(auth)
        loadUserData()
    }, [])

    useEffect(() => {
        console.log(auth)
        loadUserData()
    }, [location])

    const loadUserData = async () => {
        try {
            const res = await axios.get(USUARIO_URL, {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.accessToken}`
                }
            })
            console.log(res.data)
            setNome(res?.data?.usuario?.nome);
            setLogin(res?.data?.usuario?.login);
            setSaldo(res?.data?.usuario?.saldo);
        } catch (err) {
            alert(err)
        }
    }

    return (
        <Card className="text-center">
            <Card.Header>Wellcome {nome} ({login})</Card.Header>
            {actoin == "summary" ? <AccountSummary saldo={saldo} /> : <Transfer />}
        </Card>
    )
}