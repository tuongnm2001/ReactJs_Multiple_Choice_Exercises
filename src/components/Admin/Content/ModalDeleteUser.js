import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoClose } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteUser } from '../../../services/apiService';
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {

    const { show, setShow, dataDeleteUser, fetAllUser } = props;

    const handleClose = () => {
        setShow(false);
    }

    const handleDeleteUser = async () => {
        let res = await deleteUser(dataDeleteUser);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            fetAllUser()
            handleClose()
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the<span style={{ color: 'red' }}> {dataDeleteUser.email}</span> user?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        <IoClose /> Close
                    </Button>
                    <Button variant="danger"
                        onClick={() => handleDeleteUser()}
                    >
                        <RiDeleteBin5Line /> Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;