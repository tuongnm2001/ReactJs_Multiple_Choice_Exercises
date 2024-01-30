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
import { AiTwotoneStar } from "react-icons/ai";
import { MdDashboardCustomize, MdOutlineManageAccounts } from "react-icons/md";

import { FaGithub } from 'react-icons/fa';
import sidebarBg from '../../assest/bg2.jpg';
import './SideBar.scss'
import { Link, useNavigate } from 'react-router-dom';
import { RiContrastDropFill } from "react-icons/ri";

const SideBar = (props) => {

    const { image, collapsed, toggled, handleToggleSidebar } = props;
    const navigate = useNavigate()

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
                            icon={<MdDashboardCustomize />}
                        >
                            Dashboard
                            <Link to={'/admin'} />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape='circle'>
                        <SubMenu
                            icon={<MdOutlineManageAccounts />}
                            title="Managers"
                        >
                            <MenuItem>
                                Quản lí Users
                                <Link to={'/admin/manage-user'} />
                            </MenuItem>
                            <MenuItem>
                                Quản lí bài Quiz
                                <Link to={'/admin/manage-quizzes'} />
                            </MenuItem>

                            <MenuItem>
                                Quản lí câu hỏi
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