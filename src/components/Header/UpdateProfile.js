import './UpdateProfile.scss'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { postUpdateProfile } from '../../services/apiService';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
const UpdateProfile = (props) => {

    const account = useSelector(state => state.user.account);
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [username, setUsername] = useState('')

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
        <div className="update-profile-container">
            <div className='content'>

                <div className='content-left'>
                    <div className='title-picture'>Picture</div>
                    <div className='body-profile-img'>

                        <div className='imgProfile' >
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
                        <label className='title-User'>Username</label>
                        <input
                            className='form-control '
                            placeholder='Username'
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>

                </div>
            </div>
            <Modal.Footer>
                <Button variant="primary" onClick={() => handleSubmitUpdateProfile()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </div>
    );
}

export default UpdateProfile;