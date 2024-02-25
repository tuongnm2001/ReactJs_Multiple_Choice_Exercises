import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { MdDashboardCustomize, MdOutlineManageAccounts } from "react-icons/md";

import { FaGithub } from 'react-icons/fa';
import sidebarBg from '../../assest/bg2.jpg';
import './SideBar.scss'
import { Link, useNavigate } from 'react-router-dom';
import { RiContrastDropFill } from "react-icons/ri";
import { useTranslation } from 'react-i18next';

const SideBar = (props) => {

    const { collapsed, toggled, handleToggleSidebar } = props;
    const navigate = useNavigate()
    const { t } = useTranslation();

    const handleGoHome = () => {
        navigate('/')
    }

    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader onClick={() => handleGoHome()}>
                    <div className='title'
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <RiContrastDropFill size={'2rem'} color={"00bfff"} />
                        <span>Test Exerciese</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            active={window.location.pathname === "/admin"}
                            icon={<MdDashboardCustomize />}
                        >
                            {t('sidebar.dashboard')}
                            <Link to={'/admin'} />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape='circle'>
                        <SubMenu
                            icon={<MdOutlineManageAccounts />}
                            title={t('sidebar.managers')}
                        >
                            <MenuItem active={window.location.pathname === "/admin/manage-user"}>
                                {t('sidebar.managerUser')}
                                <Link to={'/admin/manage-user'} />
                            </MenuItem>

                            <MenuItem active={window.location.pathname === "/admin/manage-quizzes"}>
                                {t('sidebar.managerQuiz')}
                                <Link to={'/admin/manage-quizzes'} />
                            </MenuItem>

                            <MenuItem active={window.location.pathname === "/admin/manage-questions"}>
                                {t('sidebar.managerQuestion')}
                                <Link to={'/admin/manage-questions'} />
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/tuongnm2001"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', textDecoration: 'none' }}>
                                View my Github
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar;