import { useState } from 'react';
import ModalAddNewUser from '../Content/ModalAddNewUser';
import './ManageUser.scss'
import { TiPlus } from "react-icons/ti";
import TableUser from './TableUser';
const ManageUser = () => {
    const [show, setShow] = useState(false)

    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>

            <div className="users-content">
                <div>
                    <button className='btn btn-success my-3' onClick={() => setShow(true)}>
                        <TiPlus /> Add New User
                    </button>
                </div>

                <div>
                    <TableUser />
                </div>

                <ModalAddNewUser
                    show={show}
                    setShow={setShow}
                />
            </div>
        </div>
    );
}

export default ManageUser;