import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../../context/AuthProvider";
import axios from '../../api/axios';
const LOGIN_URL = '/login';

export const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { setAuth } = useContext(AuthContext);
    const loginRef = useRef();
    const errRef = useRef();
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        loginRef.current.focus();
    }, [])
    useEffect(() => {
        setErrMsg('');
    }, [login, senha])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(LOGIN_URL,
                JSON.stringify({ login, senha }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            const accessToken = res?.data?.accessToken;
            console.log(accessToken)
            setAuth({ login, senha, accessToken });
            setLogin('');
            setSenha('');
            setSuccess(true);
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.res) {
                setErrMsg('No Server Response');
            } else if (err.res?.status === 400) {
                setErrMsg('Missing login or senha');
            } else if (err.res?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <section className="p-4">
            <p ref={errRef} className={errMsg ? "alert alert-danger" : "d-none" }>{errMsg}</p>
            <h3>Sign In</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="login">Login</label>
                    <input
                        type="text"
                        id="login"
                        ref={loginRef}
                        autoComplete="off"
                        onChange={(e) => setLogin(e.target.value)}
                        value={login}
                        required
                        className="form-control"
                        placeholder="fulano"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="senha">senha</label>
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

                <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <div className="d-grid">
                    <button className="btn btn-primary">Sign In</button>
                </div>
                <p className="forgot-password text-center">
                    Need an Account?
                    <span className="line">
                        <Link to="/signup">Sign Up</Link>
                    </span>
                </p>
            </form>
        </section>
    )
}