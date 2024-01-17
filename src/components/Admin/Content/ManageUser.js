import { useState } from 'react';
import ModalAddNewUser from '../Content/ModalAddNewUser';
import './ManageUser.scss'
import { TiPlus } from "react-icons/ti";
const ManageUser = () => {
    const [show, setShow] = useState(false)

    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>

            <div className="users-content">
                <div>
                    <button className='btn btn-success' onClick={() => setShow(true)}>
                        <TiPlus /> Add New User
                    </button>
                </div>

                <div>
                    table
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