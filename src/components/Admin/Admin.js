import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Language from "../Header/Language";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import iconSettings from '../../assest/setting.png'
import iconProfile from '../../assest/profile.png'
import iconLogout from '../../assest/logout.png'
import { useTranslation } from 'react-i18next';
import { postLogOut } from "../../services/apiService";
import { doLogout } from "../../redux/action/userAction";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Admin = (props) => {

    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const account = useSelector(state => state.user.account);

    const [show, setShow] = useState(false);

    const showDropdown = (e) => {
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
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
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <div className="leftSide">
                        <FaBars className="fabars" onClick={() => setCollapsed(!collapsed)} />
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder={t("admin.search")}
                                className="me-2"
                                aria-label="Search"
                            />
                        </Form>
                    </div>

                    <div className="rightSide">
                        <NavDropdown title={
                            <>
                                <div className='profile'>
                                    <div className='imageContainer '>
                                        <img className='imageHeader' src={`data:image/jpeg;base64,${account.image}`} />
                                    </div>
                                    {account.email}
                                    {/* <img src={iconSettings} style={{ width: '20px' }} /> {t("header.setting")} */}
                                </div>                            </>
                        }
                            id='basic-nav-dropdown'
                            show={show}
                            onMouseEnter={showDropdown}
                            onMouseLeave={hideDropdown}
                            autoClose
                        >
                            <NavDropdown.Item>
                                <img src={iconProfile} style={{ width: '20px' }} /> {t("header.profile")}
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={() => handleLogout()}
                            >
                                <img src={iconLogout} style={{ width: '20px' }} /> {t("header.logout")}
                            </NavDropdown.Item>
                        </NavDropdown>

                        <Language />
                    </div>
                </div>

                <PerfectScrollbar>
                    <div className="admin-main">
                        <Outlet />
                    </div>
                </PerfectScrollbar>
            </div>
        </div>
    )
}
export default Admin;