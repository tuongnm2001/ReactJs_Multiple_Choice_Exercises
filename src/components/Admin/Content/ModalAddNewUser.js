import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalAddNewUser.scss'
import { MdOutlineFileUpload } from "react-icons/md";
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ModalAddNewUser = (props) => {

    const { show, setShow } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('USER')
    const [image, setImage] = useState('')
    const [previewImg, setPreviewImg] = useState('')

    const handleClose = () => {
        setShow(false)
        setEmail("")
        setPassword("")
        setUsername("")
        setRole("USER")
        setImage("")
        setPreviewImg("")
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

        //submit data
        const data = new FormData();
        data.append('email', email)
        data.append('password', password)
        data.append('username', username)
        data.append('role', role)
        data.append('userImage', image)

        let res = await axios.post('http://localhost:8081/api/v1/participant', data);
        if (res.data && res.data.EC === 0) {
            toast.success(res.data.EM)
        }

        if (res.data && res.data.EC === 1) {
            toast.error(res.data.EM)
            return;
        }
        handleClose();
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
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
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

export default ModalAddNewUser;