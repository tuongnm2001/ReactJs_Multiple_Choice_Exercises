import { useState, useEffect } from 'react';
import ModalAddNewUser from '../Content/ModalAddNewUser';
import './ManageUser.scss'
import { TiPlus } from "react-icons/ti";
import TableUser from './TableUser';
import { getAllUser } from '../../../services/apiService';
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUser from './ModalViewUser';
import ModalDeleteUser from './ModalDeleteUser';
const ManageUser = () => {

    const [showModalAddNewUser, setShowModalAddNewUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [listUsers, setListUsers] = useState([]);
    const [dataUpdate, setDataUpdate] = useState([]);
    const [dataViewUser, setDataViewUser] = useState([]);
    const [dataDeleteUser, setDataDeleteUser] = useState([]);

    useEffect(() => {
        fetAllUser()
    }, [])

    const fetAllUser = async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            setListUsers(res.DT)
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
                    <TableUser
                        listUsers={listUsers}
                        handleClickUpdateUser={handleClickUpdateUser}
                        handleClickViewUser={handleClickViewUser}
                        handleClickDeleteUser={handleClickDeleteUser}
                    />
                </div>

                <ModalAddNewUser
                    show={showModalAddNewUser}
                    setShow={setShowModalAddNewUser}
                    fetAllUser={fetAllUser}
                />

                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetAllUser={fetAllUser}
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
                />
            </div>
        </div>
    );
}

export default ManageUser;