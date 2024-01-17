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

import { DiReact, FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import sidebarBg from '../../assest/bg2.jpg';
import './SideBar.scss'
import { Link } from 'react-router-dom';

const SideBar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
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
                        <AiTwotoneStar size={'2rem'} color={"00bfff"} />
                        <span style={{ marginLeft: "5px" }}>Test Exerciese</span>
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
                            title="Manages"
                        >
                            <MenuItem>
                                Quản lí Users
                                <Link to={'/admin/manage-user'} />
                            </MenuItem>
                            <MenuItem>Quản lí bài Quiz</MenuItem>
                            <MenuItem>Quản lí câu hỏi</MenuItem>
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