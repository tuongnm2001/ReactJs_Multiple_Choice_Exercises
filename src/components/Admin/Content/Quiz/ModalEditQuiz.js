import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoClose } from "react-icons/io5";
import { BsArrowRepeat } from "react-icons/bs";
import Select from 'react-select';
import { MdOutlineFileUpload } from "react-icons/md";
import { useEffect, useState } from 'react';
import './ModalEditQuiz.scss'
import _ from 'lodash'
import { putUpdateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';


const ModalEditQuiz = (props) => {

    const { show, setShow, dataUpdateQuiz, fetchAllQuiz } = props;
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('')
    const [image, setImage] = useState('')
    const [previewImg, setPreviewImg] = useState('')


    useEffect(() => {
        if (!_.isEmpty(dataUpdateQuiz)) {
            setName(dataUpdateQuiz.name)
            setDescription(dataUpdateQuiz.description)
            setLevel(dataUpdateQuiz.difficulty)
            setPreviewImg(`data:image/jpeg;base64,${dataUpdateQuiz.image}`)
        }
    }, [dataUpdateQuiz])

    const options = [
        { label: 'EASY', value: 'EASY' },
        { label: 'MIDIUM', value: 'MIDIUM' },
        { label: 'HARD', value: 'HARD' }
    ]

    const handleClose = () => {
        setShow(false);
    }

    const handleSubmitUpdate = async () => {
        let res = await putUpdateNewQuiz(dataUpdateQuiz.id, name, description, level, image)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            handleClose()
            fetchAllQuiz();
        } else {
            toast.error(res.EM)
        }
    }

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImg(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }
    const handleSelect = (selectedOption) => {
        setLevel(selectedOption.value);
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
                <Modal.Title>Update Quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='row g-3 content-form-quiz'>
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input type="email" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Description</label>
                        <textarea type="text" className="form-control" value={description} onChange={(event) => setDescription(event.target.value)} />
                    </div>

                    <div className='col-md-6'>
                        <label className="form-label">Level</label>

                        <Select
                            isClearable={false}
                            options={options}
                            value={{ label: level }}
                            onChange={handleSelect}
                        />
                    </div>

                    <div className="col-md-12">
                        <label className="form-label label-uploadImg" htmlFor='labelUploadImgQuiz'>
                            <MdOutlineFileUpload /> Upload Image
                        </label>
                        <input
                            type="file"
                            hidden
                            className="form-control"
                            id='labelUploadImgQuiz'
                            onChange={(event) => handleUploadImage(event)}
                        />
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
                <Button
                    variant="warning"
                    onClick={() => handleSubmitUpdate()}
                >
                    <BsArrowRepeat /> Update
                </Button>

                <Button variant="secondary" onClick={handleClose}>
                    <IoClose /> Close
                </Button>
            </Modal.Footer>
        </Modal >
    );
}

export default ModalEditQuiz;