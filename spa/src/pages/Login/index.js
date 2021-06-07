import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { isAuthenticated, TOKEN_KEY } from '../../services/auth';
import api from '../../services/api';

export default function Login(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const history = useHistory();
    useEffect(() => {
        isAuthenticated() && history.push('/dashboard')
    });
    
    async function handleLogin(e){
        e.preventDefault();
        
        try{
            const response = await api.post('user/login', { email, password });

            localStorage.setItem(TOKEN_KEY, response.data.authorization_token);

            history.push('/dashboard');
        }catch(err){
          alert(err);
        }
    }

    return(
        <form onSubmit={handleLogin}>
            <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} />
            <button type="submit">Enviar</button>
        </form>
    )
}