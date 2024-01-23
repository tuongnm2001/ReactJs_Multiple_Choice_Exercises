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

const Register = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [showPassword, setShowPassword] = useState(false)

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

    return (
        <div className="register-container">
            <div className="content-left">
                <div className='text-signup'>
                    Sign up <br /> and come on in</div>
                <div className='imgSingup'>
                    <img src={imgSingup} />
                </div>
            </div>
            <div className="content-right">
                <div className='header-signup'>
                    <span>Already have an account?</span>
                    <button className='btnLogin' onClick={() => handleGoToLogin()}>Log in</button>
                </div>
                <div className='title-name'>
                    <RiContrastDropFill /> Test Exercises
                </div>
                <div className='description-singup'>
                    <span>Get better data with conversational forms, surveys, quizzes & more.</span>
                </div>
                <div className='content-form-register col-7 mx-auto'>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address <span style={{ color: 'red' }}>(*)</span></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password <span style={{ color: 'red' }}>(*)</span></Form.Label>
                            <Form.Control
                                type={showPassword ? "password" : "text"}
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Group>

                        <div className='d-grid gap-2'>
                            <Button variant="dark" onClick={() => handleSubmitRegister()}>
                                Create my free account
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