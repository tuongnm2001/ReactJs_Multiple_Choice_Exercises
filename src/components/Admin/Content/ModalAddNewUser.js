import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalAddNewUser.scss'
import { MdOutlineFileUpload } from "react-icons/md";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiService';
import { IoClose } from "react-icons/io5";
import { IoSaveOutline } from "react-icons/io5";
import Lightbox from "react-awesome-lightbox";

const ModalAddNewUser = (props) => {

    const { show, setShow, fetAllUser, setCurrentPage } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('USER')
    const [image, setImage] = useState('')
    const [previewImg, setPreviewImg] = useState('')
    const [isPreviewImg, setIsPreviewImg] = useState(false)

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

        let data = await postCreateNewUser(email, password, username, role, image)
        if (data && data.EC === 0) {
            // await fetAllUser();
            handleClose();
            toast.success(data.EM)
            setCurrentPage(1)
            await props.fetAllUserWithPaginate(1)
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

                        <div className='col-md-12 img-preview' onClick={() => setIsPreviewImg(true)}>
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
                    <Button variant="primary" onClick={() => handleSubmitAddUser()}>
                        <IoSaveOutline /> Save
                    </Button>

                    <Button variant="secondary" onClick={handleClose}>
                        <IoClose /> Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {
                isPreviewImg === true &&
                < Lightbox
                    image={previewImg}
                    // title={dataImgPreview.title}
                    onClose={() => setIsPreviewImg(false)}
                />
            }
        </>
    );
}

export default ModalAddNewUser;