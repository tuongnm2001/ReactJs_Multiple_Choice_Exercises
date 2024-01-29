import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalUpdateUser.scss'
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from 'react';
import _ from 'lodash'

const ModalUpdateUser = (props) => {

    const { show, setShow, dataViewUser } = props;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('USER')
    const [image, setImage] = useState('')
    const [previewImg, setPreviewImg] = useState('')

    useEffect(() => {
        if (!_.isEmpty(dataViewUser)) {
            setEmail(dataViewUser.email)
            setUsername(dataViewUser.username)
            setRole(dataViewUser.role)
            setPreviewImg(`data:image/jpeg;base64,${dataViewUser.image}`)
        }
    }, [dataViewUser])

    const handleClose = () => {
        setShow(false)
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>View User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                readOnly
                                type="email"
                                className="form-control"
                                value={email}

                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                readOnly
                                type="password"
                                className="form-control"
                                value={'********'}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                readOnly
                                type="text"
                                className="form-control"
                                value={username}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                disabled
                                value={role}
                                className="form-select"
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>

                        <div className="col-md-12">

                        </div>

                        <div className='col-md-12 img-preview'>
                            {
                                previewImg ?
                                    <img src={previewImg} />
                                    :
                                    <span>Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        <IoClose /> Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;