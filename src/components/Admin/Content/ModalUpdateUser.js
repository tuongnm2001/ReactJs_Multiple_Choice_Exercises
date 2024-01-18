import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalUpdateUser.scss'
import { MdOutlineFileUpload } from "react-icons/md";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiService';
import _ from 'lodash'

const ModalUpdateUser = (props) => {

    const { show, setShow, fetAllUser, dataUpdate } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('USER')
    const [image, setImage] = useState('')
    const [previewImg, setPreviewImg] = useState('')

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email)
            setUsername(dataUpdate.username)
            setRole(dataUpdate.role)
            // if (dataUpdate.image) {
            setPreviewImg(`data:image/jpeg;base64,${dataUpdate.image}`)
            // }
        }
    }, [dataUpdate])

    const handleClose = () => {
        setShow(false)
    }

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImg(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitAddUser = async () => {

        const isValidEmail = validateEmail(email);

        if (!isValidEmail) {
            toast.error("Invalid Email")
            return;
        }

        if (!password) {
            toast.error("Invalid Password")
            return;
        }

        let data = await postCreateNewUser(email, password, username, role, image)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose();
            await fetAllUser();
        }

        if (data && data.EC === 1) {
            toast.error(data.EM)
            return;
        }
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
                    <Modal.Title>Update A User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                disabled
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                disabled
                                type="password"
                                className="form-control"
                                value={'********'}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                value={role}
                                className="form-select"
                                onChange={(event) => setRole(event.target.value)}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                <MdOutlineFileUpload /> Upload Image
                            </label>
                            <input
                                type="file"
                                hidden
                                className="form-control"
                                id='labelUpload'
                                onChange={(event) => handleUploadImage(event)}
                            />
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
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitAddUser()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;