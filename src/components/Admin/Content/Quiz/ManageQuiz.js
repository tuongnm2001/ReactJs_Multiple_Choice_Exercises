import './ManageQuiz.scss'
import Select from 'react-select';
import { MdOutlineFileUpload } from "react-icons/md";
import { useState, useEffect } from 'react';
import { postCreateNewQuiz, getAllQuizForAdmin } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import { IoSaveOutline } from "react-icons/io5";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Lightbox from "react-awesome-lightbox";
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';

const ManageQuiz = () => {

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MIDIUM', label: 'MIDIUM' },
        { value: 'HARD', label: 'HARD' }
    ]

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [level, setLevel] = useState('EASY')
    const [imageQuiz, setImageQuiz] = useState('')
    const [previewImageQuiz, setPreviewImageQuiz] = useState('')
    const [listQuiz, setListQuiz] = useState([]);
    const [isPreviewImg, setIsPreviewImg] = useState(false)

    useEffect(() => {
        fetchAllQuiz();
    }, []);

    const fetchAllQuiz = async () => {
        let res = await getAllQuizForAdmin();
        setListQuiz(res.DT)
    }

    const handleUploadImageQuiz = (event) => {
        setImageQuiz(event.target.files[0])
        setPreviewImageQuiz(URL.createObjectURL(event.target.files[0]));
    }

    const handleSubmitAddNewQuiz = async () => {
        if (!name || !description) {
            toast.error('Name/Description is required!');
            return;
        }
        let res = await postCreateNewQuiz(name, description, level?.value, imageQuiz);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('')
            setDescription('')
            setLevel('')
            setPreviewImageQuiz('')
            fetchAllQuiz()
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <>
            <div className="quiz-container">
                <div className="title">
                    Manage Quizzes
                </div>

                <Tabs
                    defaultActiveKey="add-new-quiz"
                    id="justify-tab-example"
                    className="mb-3"
                    justify
                >
                    <Tab eventKey="add-new-quiz" title="Add New Quiz">
                        <div className="add-new">
                            <fieldset className='border rounded-3 p-3'>
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
                                        options={options || ''}
                                        defaultValue={level}
                                        onChange={setLevel}
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

                                <div className='col-12 previewImgQuiz' onClick={() => setIsPreviewImg(true)}>
                                    {
                                        previewImageQuiz ?
                                            <img src={previewImageQuiz} />
                                            :
                                            <span>Image</span>
                                    }
                                </div>

                                <div>
                                    <button
                                        className='btn btn-primary mt-3'
                                        onClick={() => handleSubmitAddNewQuiz()}
                                    >
                                        <IoSaveOutline /> Save
                                    </button>
                                </div>
                            </fieldset>
                        </div>

                        <div className="list-detail my-3">
                            <span className='title-listQuizzes'> List Quizzes</span>
                            <TableQuiz
                                listQuiz={listQuiz}
                                fetchAllQuiz={fetchAllQuiz}
                            />
                        </div>
                    </Tab>

                    <Tab eventKey="assign-to-user" title="Assign to User">
                        <AssignQuiz />
                    </Tab>

                    <Tab eventKey="update-qa-quizzes" title="Update Q/A Quizzes">
                        <QuizQA />
                    </Tab>
                </Tabs>


            </div>
            {
                isPreviewImg === true &&
                < Lightbox
                    image={previewImageQuiz}
                    // title={dataImgPreview.title}
                    onClose={() => setIsPreviewImg(false)}
                />
            }
        </>
    );
}

export default ManageQuiz;