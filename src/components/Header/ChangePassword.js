import './ChangePassword.scss'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { postChangePassword } from '../../services/apiService';
import { toast } from 'react-toastify';

const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [checkIsValid, setCheckIsValid] = useState(false)

    const handleSubmitChangePassword = async () => {
        // console.log(currentPassword, newPassword);
        const res = await postChangePassword(currentPassword, newPassword);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setCurrentPassword('')
            setNewPassword('')
        } else {
            toast.error(res.EM)
            setCheckIsValid(true)
        }
    }

    const handleOnChangeCurrentPassword = (event) => {
        setCurrentPassword(event.target.value)
        setCheckIsValid(false)
    }

    return (
        <div className='change-password-container'>
            <div className='title'>Change Password</div>
            <FloatingLabel
                controlId="floatingInput"
                label="Current Password"
                className="mb-3"
            >
                <Form.Control
                    type="password"
                    placeholder="name@example.com"
                    onChange={(event) => handleOnChangeCurrentPassword(event)}
                    className={checkIsValid === true ? 'form-control is-invalid ' : 'form-control'}
                />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="New Password">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(event) => setNewPassword(event.target.value)}
                />
            </FloatingLabel>

            <Modal.Footer>
                <Button variant="primary" onClick={() => handleSubmitChangePassword()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </div>
    );
}

export default ChangePassword;