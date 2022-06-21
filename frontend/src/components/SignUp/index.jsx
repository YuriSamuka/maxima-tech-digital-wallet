import { useRef, useState, useEffect, useContext } from 'react';
import axios from '../../api/axios';
const SIGNUP_URL = '/register';

export const SignUp = () => {

    const nomeRef = useRef();
    const [nome, setNome] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        nomeRef.current.focus();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(SIGNUP_URL,
                JSON.stringify({ nome, login, senha }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setNome('');
            setLogin('');
            setSenha('');
            setSuccess(true);
        } catch (err) {
            setErrMsg(err?.response?.data.Error)
        }
    }

    return (
        <section className="p-4">
            {
                success ? <p className="alert alert-success">Seu cadastro foi realizado com sucesso</p>
                :
                <p className={errMsg ? "alert alert-danger" : "d-none" }>{errMsg}</p> 
            }
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        ref={nomeRef}
                        onChange={(e) => setNome(e.target.value)}
                        value={nome}
                        required
                        className="form-control"
                        placeholder="fulano de tal"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="login">Login</label>
                    <input
                        type="text"
                        id="login"
                        onChange={(e) => setLogin(e.target.value)}
                        value={login}
                        required
                        className="form-control"
                        placeholder="fulano01"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        onChange={(e) => setSenha(e.target.value)}
                        value={senha}
                        required
                        className="form-control"
                        placeholder="*******"
                    />
                </div>

                <div className="d-grid">
                    <button className="btn btn-primary">Sign Up</button>
                </div>
                <p className="forgot-password text-right">
                    Already registered 
                    <a href="/login">sign in?</a>
                </p>
            </form>
        </section>
    )
}
