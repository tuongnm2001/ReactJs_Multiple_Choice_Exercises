import './UpdateProfile.scss'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { postUpdateProfile } from '../../services/apiService';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Lightbox from "react-awesome-lightbox";

const UpdateProfile = (props) => {

    const account = useSelector(state => state.user.account);
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [username, setUsername] = useState('')
    // const [previewImg, setPreviewImg] = useState('')
    const [isPreviewImg, setIsPreviewImg] = useState(false)

    useEffect(() => {
        setUsername(account.username)
        setPreviewImage(`data:image/jpeg;base64,${account.image}`)
    }, [])

    const handleUploadImg = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    const handleSubmitUpdateProfile = async () => {
        const res = await postUpdateProfile(username, image);
        if (res && res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <>
            <div className="update-profile-container">
                <div className='content'>

                    <div className='content-left'>
                        <div className='title-picture'>Picture</div>
                        <div className='body-profile-img'>

                            <div className='imgProfile' onClick={() => setIsPreviewImg(true)}>
                                <img src={previewImage} />
                            </div>

                            <input
                                type='file'
                                id='labelUpload'
                                className='form-control'
                                hidden
                                onChange={(event) => handleUploadImg(event)}
                            />

                            <label className='btn btn-primary mt-3 fullWidthButton' htmlFor='labelUpload'>Upload new image</label>
                        </div>
                    </div>

                    <div className='content-right '>
                        <div className='title-account-detail container'>Account Details</div>
                        <div className='body-account-daitails container'>
                            <div className='form-group'>
                                <label className='title-User'>Username</label>
                                <input
                                    className='form-control '
                                    placeholder='Username'
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </div>

                            <div className='form-group emailUpdateProfile'>
                                <label className='title-User'>Email</label>
                                <input
                                    className='form-control '
                                    placeholder='Username'
                                    value={account.email}
                                    readOnly
                                />
                            </div>

                            <div className='form-group'>
                                <label className='title-User'>Role</label>
                                <input
                                    className='form-control '
                                    placeholder='Username'
                                    value={account.role}
                                    readOnly
                                />
                            </div>
                        </div>

                    </div>
                </div>



                <Modal.Footer className='modal-footer-update-profile'>
                    <Button variant="primary" onClick={() => handleSubmitUpdateProfile()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </div>

            {
                isPreviewImg === true &&
                < Lightbox
                    image={previewImage}
                    // title={dataImgPreview.title}
                    onClose={() => setIsPreviewImg(false)}
                />
            }
        </>
    );
}

export default UpdateProfile;