import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()

    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const handleLogin = () => {
        navigate('/login')
    }

    const handleSignUp = () => {
        navigate('/register')
    }

    return (
        <Navbar expand="lg" bg='light'>
            <Container>
                <NavLink to="/" className='navbar-brand'>Test Exercises</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="/user" className='nav-link'>User</NavLink>
                        <NavLink to="/admin" className='nav-link'>Admin</NavLink>
                    </Nav>

                    <Nav>
                        {
                            <>
                                {
                                    isAuthenticated === false ?
                                        <div className="d-grid gap-2 d-md-block">
                                            <button className='btn btn-login' onClick={() => handleLogin()}>Login</button>
                                            <button className='btn btn-dark' onClick={() => handleSignUp()}>Sign up</button>
                                        </div>
                                        :
                                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                                            <NavDropdown.Item>Logout</NavDropdown.Item>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </NavDropdown>
                                }

                            </>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;