import './Login.scss'
import { useState } from 'react';
import { RiContrastDropFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { postLoginUser } from '../../services/apiService';
import { toast } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { IoHome } from "react-icons/io5";

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleGoBackHome = () => {
        navigate('/')
    }

    const handleSubmitLogin = async () => {
        setIsLoading(true)
        let data = await postLoginUser(email, password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data));
            toast.success(data.EM)
            setIsLoading(false)
            // navigate('/')
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
            setIsLoading(false)

        }
    }

    const handleSignUp = () => {
        navigate('/register')
    }

    return (
        <div className='login-container'>
            <div className='header'>
                <span className='goHome'><IoHome onClick={() => handleGoBackHome()} /></span>
                <span className='dhay'>Don't have an account yet?</span>
                <button className='btnSignup' onClick={() => handleSignUp()}>Sign up</button>
            </div>

            <div className='title-login col-4 mx-auto' onClick={() => handleGoBackHome()}>
                <RiContrastDropFill /> Test Exercises
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
                        type={showPassword ? "text" : "password"}
                        className='form-control'
                        placeholder='At least 8 characters'
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <span className='forgotPassword'>Forgot password?</span>

                <button className='btn btn-dark' disabled={!email || !password || isLoading === true} onClick={() => handleSubmitLogin()}>
                    {isLoading === true && < div className="spinner-border spinner-border-sm" />} &nbsp;
                    <span>Log in to Test Exercises</span>
                </button>


                <div className='eyeLogin'>
                    <>
                        {
                            showPassword ?
                                <FaRegEye onClick={() => setShowPassword(!showPassword)} />
                                :
                                <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} />
                        }
                    </>
                </div>
            </div>

        </div>
    );
}

export default Login;