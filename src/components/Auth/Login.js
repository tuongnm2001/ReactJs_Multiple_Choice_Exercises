import { useState } from 'react';
import './Login.scss'
import { RiContrastDropFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleGoBackHome = () => {
        navigate('/')

    }

    const handleSubmitLogin = () => {
        alert('hello')
    }

    return (
        <div className='login-container'>
            <div className='header'>
                <span className='dhay'>Don't have an account yet?</span>
                <button className='btnSignup'>Sign up</button>
            </div>
            <div className='title-login col-4 mx-auto' onClick={() => handleGoBackHome()}>
                <RiContrastDropFill /> Typeform
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='welcome mx-auto'>
                    Hello, who’s this?
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        value={email}
                        type='email'
                        className='form-control'
                        placeholder='bruce@wayne.com'
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <div>Password</div>
                    <input
                        value={password}
                        type='password'
                        className='form-control'
                        placeholder='At least 8 characters'
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <span className='forgotPassword'>Forgot password?</span>

                <div className='btn-login'>
                    <button onClick={() => handleSubmitLogin()}>Log in to Typeform</button>
                </div>
            </div>
        </div>
    );
}

export default Login;