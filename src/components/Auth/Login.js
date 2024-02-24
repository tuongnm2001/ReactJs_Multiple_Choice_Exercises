import './Login.scss'
import { useState, useRef } from 'react';
import { RiContrastDropFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { postLoginUser } from '../../services/apiService';
import { toast } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { IoHome } from "react-icons/io5";
import Language from '../Header/Language';
import { useTranslation } from 'react-i18next';

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const passwordInputRef = useRef();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { t } = useTranslation();

    const handleSubmitLogin = async () => {
        setIsLoading(true)
        let data = await postLoginUser(email, password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data));
            toast.success(data.EM)
            setIsLoading(false)
            navigate('/')
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
            setIsLoading(false)

        }
    }

    const handleKeyDownPassword = (event) => {
        if (event.key === 'Enter') {
            passwordInputRef.current.focus();
        }
    }

    const handleKeyDown = (event) => {
        if (event && event.key === "Enter") {
            handleSubmitLogin();
        }
    }

    return (
        <div className='login-container'>
            <div className='header'>
                <div className='language'><Language /></div>
                <span className='goHome'><IoHome onClick={() => navigate('/')} /></span>
                <span className='dhay'>{t('login.dhay')}</span>
                <button className='btnSignup' onClick={() => navigate('/register')}>{t('login.btnSignup')}</button>
            </div>

            <div className='title-login col-4 mx-auto' onClick={() => navigate('/')}>
                <RiContrastDropFill /> Test Exercises
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='welcome mx-auto'>
                    {t('login.welcome')}
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        value={email}
                        type='email'
                        className='form-control'
                        placeholder='bruce@wayne.com'
                        onChange={(event) => setEmail(event.target.value)}
                        onKeyDown={(event) => handleKeyDownPassword(event)}
                    />
                </div>

                <div className='form-group'>
                    <div>{t('login.passwordLogin')}</div>
                    <input
                        value={password}
                        type={showPassword ? "text" : "password"}
                        className='form-control'
                        placeholder={t('login.placehoderPass')}
                        ref={passwordInputRef}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event)}
                    />
                </div>

                <span className='forgotPassword'>{t('login.forgotPassword')}</span>

                <button className='btn btn-dark' disabled={!email || !password || isLoading === true} onClick={() => handleSubmitLogin()}>
                    {isLoading === true && < div className="spinner-border spinner-border-sm" />} &nbsp;
                    <span>{t('login.btnLogin')}</span>
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