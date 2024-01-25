import { useState, useEffect } from 'react';
import ModalAddNewUser from '../Content/ModalAddNewUser';
import './ManageUser.scss'
import { TiPlus } from "react-icons/ti";
import TableUser from './TableUser';
import { getAllUser, getUserWithPaginate } from '../../../services/apiService';
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUser from './ModalViewUser';
import ModalDeleteUser from './ModalDeleteUser';
import TableUserPaginate from './TableUserPaginate';
const ManageUser = () => {

    const LIMIT_USER = 6;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalAddNewUser, setShowModalAddNewUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [listUsers, setListUsers] = useState([]);
    const [dataUpdate, setDataUpdate] = useState([]);
    const [dataViewUser, setDataViewUser] = useState([]);
    const [dataDeleteUser, setDataDeleteUser] = useState([]);

    useEffect(() => {
        // fetAllUser()
        fetAllUserWithPaginate(1);
    }, [])

    const fetAllUser = async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            setListUsers(res.DT)
        }
    }

    const fetAllUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res && res.EC === 0) {
            setListUsers(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }

    const handleClickUpdateUser = (user) => {
        setShowModalUpdateUser(true)
        setDataUpdate(user)
    }

    const handleClickViewUser = (user) => {
        setShowModalViewUser(true)
        setDataViewUser(user)
    }

    const handleClickDeleteUser = (id) => {
        setShowModalDeleteUser(true)
        setDataDeleteUser(id)
    }

    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>

            <div className="users-content">
                <div>
                    <button className='btn btn-success my-2' onClick={() => setShowModalAddNewUser(true)}>
                        <TiPlus /> Add New User
                    </button>
                </div>

                <div className='table-users-container'>
                    {/* <TableUser
                        listUsers={listUsers}
                        handleClickUpdateUser={handleClickUpdateUser}
                        handleClickViewUser={handleClickViewUser}
                        handleClickDeleteUser={handleClickDeleteUser}
                    /> */}

                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickUpdateUser={handleClickUpdateUser}
                        handleClickViewUser={handleClickViewUser}
                        handleClickDeleteUser={handleClickDeleteUser}
                        fetAllUserWithPaginate={fetAllUserWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                <ModalAddNewUser
                    show={showModalAddNewUser}
                    setShow={setShowModalAddNewUser}
                    fetAllUser={fetAllUser}
                    fetAllUserWithPaginate={fetAllUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetAllUser={fetAllUser}
                    fetAllUserWithPaginate={fetAllUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}

                />

                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataViewUser={dataViewUser}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDeleteUser={dataDeleteUser}
                    fetAllUser={fetAllUser}
                    fetAllUserWithPaginate={fetAllUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default ManageUser;