// src/components/Login.jsx
import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
    const { login } = useContext(AuthContext);
    const [usern, setUsern] = useState('');
    const [pass, setPass] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const handle = async e => {
        e.preventDefault();
        setErr('');
        const ok = await login(usern, pass);
        if (ok) {
            navigate('/');        // volta pro calendário
        } else {
            setErr('Usuário ou senha inválidos');
        }
    };

    return (
        <div className="login-page">
            <form className="login-box" onSubmit={handle}>
                <h2>ConectaTur</h2>
                <p>Faça seu login</p>
                <input
                    type="text"
                    placeholder="Usuário"
                    value={usern}
                    onChange={e => setUsern(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
                {err && <div className="error">{err}</div>}
            </form>
        </div>
    );
}
