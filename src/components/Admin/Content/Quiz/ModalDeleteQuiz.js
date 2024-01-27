import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const ModalDeleteQuiz = (props) => {

    const { show, setShow, dataDeleteQuiz, fetchAllQuiz, listQuiz } = props;

    const handleClose = () => {
        setShow(false)
    }

    const handleSubmitDeleteQuiz = async () => {
        let res = await deleteQuiz(dataDeleteQuiz.id)
        if (res && res.EC === 0) {
            handleClose();
            toast.success(res.EM);
            fetchAllQuiz();
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete the <b style={{ color: 'red' }}>{dataDeleteQuiz.name}</b> test ?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => handleSubmitDeleteQuiz()}>
                    <RiDeleteBin5Line /> Delete
                </Button>

                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal >
    );
}

export default ModalDeleteQuiz;