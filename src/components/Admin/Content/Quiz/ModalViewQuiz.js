import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoClose } from "react-icons/io5";
import Select from 'react-select';
import { useEffect, useState } from 'react';
import _ from 'lodash'


const ModalViewQuiz = (props) => {

    const { show, setShow, dataViewQuiz, fetchAllQuiz } = props;
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('')
    const [image, setImage] = useState('')
    const [previewImg, setPreviewImg] = useState('')


    useEffect(() => {
        if (!_.isEmpty(dataViewQuiz)) {
            setName(dataViewQuiz.name)
            setDescription(dataViewQuiz.description)
            setLevel(dataViewQuiz.difficulty)
            setPreviewImg(`data:image/jpeg;base64,${dataViewQuiz.image}`)
        }
    }, [dataViewQuiz])


    const handleClose = () => {
        setShow(false);
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>View Quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='row g-3 content-form-quiz'>
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input type="email" className="form-control" value={name} readOnly />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Description</label>
                        <textarea type="text" className="form-control" value={description} readOnly />
                    </div>

                    <div className='col-md-6'>
                        <label className="form-label">Level</label>

                        <Select
                            isClearable={false}
                            value={{ label: level }}
                            isDisabled
                        />
                    </div>

                    <div className="col-md-12">

                    </div>

                    <div className='col-md-12 imgQuiz-preview'>
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
        </Modal >
    );
}

export default ModalViewQuiz;