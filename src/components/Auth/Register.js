import './Register.scss'
import imgSingup from '../../assest/product-sample@2x.webp'
import { RiContrastDropFill } from "react-icons/ri";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postRegisterUser } from '../../services/apiService';
import { toast } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Language from '../Header/Language';
import { useTranslation } from 'react-i18next';

const Register = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const { t } = useTranslation();

    const handleSubmitRegister = async () => {
        let data = await postRegisterUser(email, username, password)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate('/login')
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    const handleGoToLogin = () => {
        navigate('/login')
    }

    const handleGoHomepage = () => {
        navigate('/')
    }

    return (
        <div className="register-container">
            <div className="content-left">
                <div className='text-signup'>
                    {t('register.title1')} <br /> {t('register.title2')}</div>
                <div className='imgSingup'>
                    <img src={imgSingup} />
                </div>
            </div>
            <div className="content-right">
                <div className='header-signup'>
                    <span>{t('register.ahaa')}</span>
                    <button className='btnLogin' onClick={() => handleGoToLogin()}>{t('register.btnLogin')}</button>
                    <div className='language-register'><Language /></div>
                </div>

                <div className='title-name' onClick={() => handleGoHomepage()}>
                    <RiContrastDropFill /> Test Exercises
                </div>

                <div className='description-singup'>
                    <span>{t('register.titleRegister')}</span>
                </div>
                <div className='content-form-register col-7 mx-auto'>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email <span style={{ color: 'red' }}>(*)</span></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>{t('register.passwordRegister')} <span style={{ color: 'red' }}>(*)</span></Form.Label>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder={t('register.passwordRegister')}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>{t('register.userRegister')}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t('register.userRegister')}
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Group>

                        <div className='d-grid gap-2'>
                            <Button variant="dark" onClick={() => handleSubmitRegister()}>
                                {t('register.cmfa')}
                            </Button>
                        </div>

                        <div className='eye'>
                            <>
                                {
                                    showPassword ?
                                        <FaRegEye onClick={() => setShowPassword(!showPassword)} />
                                        :
                                        <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} />
                                }
                            </>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Register;