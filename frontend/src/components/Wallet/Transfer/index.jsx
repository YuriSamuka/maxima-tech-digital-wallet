import { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import useAuth from '../../../hooks/useAuth'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from '../../../api/axios'

const TRANSFER_URL = '/movimentacao/transfer'

export const Transfer = () => {

    const toRef = useRef();
    const { auth } = useAuth();
    const [to, setTo] = useState('')
    const [value, setValue] = useState('')
    const [msg, setMsg] = useState('')
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        toRef.current.focus();
    }, [])

    const onClick = async () => {
        try {
            const res = await axios.post(TRANSFER_URL, 
                JSON.stringify({ login_destino: to, valor_transferido: value }),
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.accessToken}`
                    }
                }
                )
            setSuccess(true)
            setMsg("Sua transação foi concluida com sucesso")
        } catch (err) {
            setMsg(err.message)
            alert(err)
        }
    }

    return (
        <>
            <Card.Body>
                <Card.Title>Make a transfer</Card.Title>
                <Card.Text className={success ? "alert alert-success" : ""}>
                    {msg ? msg : ""}
                </Card.Text>
                <form>
                    <div className="mb-3">
                        <label htmlFor="login_destino">Destinatário</label>
                        <input
                            type="text"
                            id="login_destino"
                            ref={toRef}
                            onChange={(e) => setTo(e.target.value)}
                            value={to}
                            required
                            className="form-control"
                            placeholder="fulano01"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="valor_transferido">Valor $</label>
                        <input
                            type="number"
                            step={.01}
                            id="valor_transferido"
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                            required
                            className="form-control"
                            placeholder="50"
                        />
                    </div>

                    <div className="d-grid">
                        <Button variant="primary" onClick={onClick}>Transfer</Button>
                    </div>
                </form>
            </Card.Body>
            <Card.Footer className="text-muted">
                <Link to="/">Go back</Link>
            </Card.Footer>
        </>
    )
}