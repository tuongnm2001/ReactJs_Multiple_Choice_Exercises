import './ManageQuiz.scss'
import Select from 'react-select';
import { MdOutlineFileUpload } from "react-icons/md";
import { useState } from 'react';

const ManageQuiz = () => {

    const options = [
        { value: 'EASY', label: 'Chocolate' },
        { value: 'MIDIUM', label: 'Strawberry' },
        { value: 'HARD', label: 'Vanilla' }
    ]

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [level, setLevel] = useState('EASY')
    const [imageQuiz, setImageQuiz] = useState('')
    const [previewImageQuiz, setPreviewImageQuiz] = useState('')

    const handleUploadImageQuiz = (event) => {
        setPreviewImageQuiz(URL.createObjectURL(event.target.files[0]));
    }

    const handleChangeFile = (event) => {

    }

    return (
        <div className="quiz-container">
            <div className="title">
                Manage Quizzes
            </div>

            <div className="add-new">
                <fieldset className='border rounded-3 p-3'>
                    <legend className='float-none w-auto px-3'>Add new Quiz</legend>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            value={name}
                            className="form-control"
                            onChange={(event) => setName(event.target.value)}
                            placeholder=""
                        />
                        <label>Name</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="text"
                            value={description}
                            className="form-control"
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="" />
                        <label>Description</label>
                    </div>

                    <div className='my-3'>
                        <Select
                            options={options}
                            value={level}
                            onChange={(event) => handleChangeFile(event)}
                        />
                    </div>

                    <div className='more-actions'>
                        <label className='form-label button-manage-quiz' htmlFor='uploadImgQuiz'>
                            <MdOutlineFileUpload /> Upload Image
                        </label>
                        <input
                            hidden
                            type='file'
                            id='uploadImgQuiz'
                            onChange={(event) => handleUploadImageQuiz(event)}
                        />
                    </div>

                    <div className='col-12 previewImgQuiz'>
                        {
                            previewImageQuiz ?
                                <img src={previewImageQuiz} />
                                :
                                <span>Image</span>
                        }
                    </div>

                </fieldset>
            </div>


            <div className="table">

            </div>
        </div>
    );
}

export default ManageQuiz;