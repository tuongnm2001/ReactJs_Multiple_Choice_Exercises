import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoClose } from "react-icons/io5";
import { FaEnvelopeOpenText } from "react-icons/fa";

const ModalResult = (props) => {

    const { show, setShow, dataModalResult } = props;

    const handleClose = () => {
        setShow(false);
    }

    console.log(dataModalResult);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Your Results</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total Questions : <b>{dataModalResult.countTotal}</b></div>
                    <div>Total Correct Anwsers: <b>{dataModalResult.countCorrect}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={handleClose}>
                        <FaEnvelopeOpenText /> Show Answers
                    </Button>

                    <Button variant="secondary"
                        onClick={handleClose}
                    >
                        <IoClose /> Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;