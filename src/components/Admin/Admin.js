import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Language from "../Header/Language";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { postLogOut } from "../../services/apiService";
import { doLogout } from "../../redux/action/userAction";

const Admin = (props) => {

    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();

    // const handleLogout = async () => {
    //     let res = await postLogOut(account.email, account.refresh_token)
    //     if (res && res.EC === 0) {
    //         dispatch(doLogout())
    //         navigate('/login')
    //         toast.success('Logout Successfully!');
    //     } else {
    //         toast.error(res.EM)
    //     }
    // }

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
                        <NavDropdown title={t("header.setting")}
                            id='basic-nav-dropdown'
                        >
                            <NavDropdown.Item>
                                {t("header.profile")}
                            </NavDropdown.Item>
                            <NavDropdown.Item
                            // onClick={() => handleLogout()}
                            >
                                {t("header.logout")}
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