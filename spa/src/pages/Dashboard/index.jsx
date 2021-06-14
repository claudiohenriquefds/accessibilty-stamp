import React from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../../services/auth';

const Dashboard = () => {
    const history = useHistory();
    return(
        <button type="button" onClick={() => logout(history)}>Sair</button>
    )
}

export default Dashboard;
