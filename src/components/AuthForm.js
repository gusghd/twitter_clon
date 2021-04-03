import React, {useState} from 'react';
import { authService } from 'fbase';

function AuthForm() {

    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    
    const onToggleAccount = () => setNewAccount(prev => !prev)

    const onChange = (e) => {
        const {target: {name, value}} = e;
        if(name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if(newAccount) {
               await authService.createUserWithEmailAndPassword(email, password);
            } else {
               await authService.signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setError(error.message);
        }

    }

    return (
        <>
        <form onSubmit={onSubmit} className="container">
            <input type="email" name="email" required placeholder="Email" value={email} onChange={onChange} className="authInput"/ >
            <input type="password" name="password" required placeholder="Password" value={password} onChange={onChange} className="authInput"/ >
            <input type="submit" required value={newAccount ? 'Create Account' : 'Log In'} className="authInput authSubmit"/ >
            {error && <span className="authError">{error}</span>}
        </form>
        <span className="authSwitch" onClick={onToggleAccount}>{newAccount ? 'Log In' : 'Create Account'}</span>
        </>
    )
}

export default AuthForm;