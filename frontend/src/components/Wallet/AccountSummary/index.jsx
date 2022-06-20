import { useNavigate, useLocation } from 'react-router-dom';
import { TransactionList } from '../../TransactionList'
import { useState, useEffect } from 'react'
import useAuth from '../../../hooks/useAuth'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from '../../../api/axios'

const TRANSACTION_URL = '/movimentacao'

export const AccountSummary = ({ saldo }) => {

    const { auth } = useAuth();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        loadTransactions()
    }, [])

    const loadTransactions = async () => {
        try {
            const res = await axios.get(TRANSACTION_URL, {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.accessToken}`
                }
            })
            const tx = res.data.map( (e) => {
                return {
                    type: e.login_origem == auth.login ? 'debit' : 'credit',
                    user: e.login_origem == auth.login ? e.login_destino : e.login_origem,
                    value: e.valor_transferido,
                }
            })
            setTransactions(tx)
        } catch (err) {
            alert(err)
        }
    }
    const goToTransfer = () => {
        navigate("/transfer", { replace: true });
    }

    return (
        <>
            <Card.Body>
                <Card.Title>Saldo: {saldo}$</Card.Title>
                <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button variant="primary" onClick={goToTransfer}>Make a transfer</Button>
            </Card.Body>
            <Card.Footer className="text-muted">
                <TransactionList transactions={transactions}></TransactionList>
            </Card.Footer>
        </>
    )
}