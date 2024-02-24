import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { postLogOut } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import { useTranslation } from 'react-i18next';
import Language from './Language';

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const { t } = useTranslation();

    const handleLogin = () => {
        navigate('/login')
    }

    const handleSignUp = () => {
        navigate('/register')
    }

    const handleLogout = async () => {
        let res = await postLogOut(account.email, account.refresh_token)
        if (res && res.EC === 0) {
            dispatch(doLogout())
            navigate('/login')
            toast.success('Logout Successfully!');
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <Navbar expand="lg" bg='transparent'>
            <Container>
                <NavLink to="/" className='navbar-brand'>Test Exercises</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>{t('header.home')}</NavLink>
                        <NavLink to="/user" className='nav-link'>{t('header.user')}</NavLink>
                        <NavLink to="/admin" className='nav-link'>{t('header.admin')}</NavLink>
                    </Nav>

                    <Nav>
                        <>
                            {
                                isAuthenticated === false ?
                                    <div className="d-grid gap-2 d-md-block">
                                        <button className='btn btn-login' onClick={() => handleLogin()}>Login</button>
                                        <button className='btn btn-dark' onClick={() => handleSignUp()}>Sign up</button>
                                    </div>
                                    :
                                    <NavDropdown title={t("header.setting")}
                                        id='basic-nav-dropdown'
                                    >
                                        <NavDropdown.Item>
                                            {t("header.profile")}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            onClick={() => handleLogout()}
                                        >
                                            {t("header.logout")}
                                        </NavDropdown.Item>
                                    </NavDropdown>
                            }

                            <Language />

                        </>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Header;