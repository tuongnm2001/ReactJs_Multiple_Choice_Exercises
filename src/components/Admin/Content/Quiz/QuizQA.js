import { useEffect, useState } from 'react';
import Select from 'react-select';
import './QuizQA.scss'
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import {
    getAllQuizForAdmin,
    getQuizWithQA,
    postUpsertQA
} from "../../../../services/apiService";
import { toast } from 'react-toastify';

const QuizQA = () => {

    const initQuestion = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            isValidQuestion: false,
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                    isValidAnwser: false,
                }
            ]
        }
    ]
    const [questions, setQuestions] = useState(initQuestion)
    const [isPreviewImg, setIsPreviewImg] = useState(false)
    const [dataImgPreview, setDataImgPreview] = useState({
        title: '',
        url: ''
    })
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [listQuiz, setListQuiz] = useState([])

    useEffect(() => {
        fetchQuiz()
    }, [])

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA()
        }
    }, [selectedQuiz])

    const urltoFile = (url, filename, mimeType) => {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }) })
        )
    }

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value)
        if (res && res.EC === 0) {
            //convert base 64 to File object
            let newQA = []
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i];
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, 'image/png');
                }
                newQA.push(q);
            }
            setQuestions(newQA)
        } else {
            toast.error(res.EM)
        }
    }

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const handleAddRemoveQuestion = (type, id) => {
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questions, newQuestion])
        }

        if (type === "REMOVE") {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestions(questionClone);
        }
    }

    const handleAddRemoveAnswer = (type, questionId, anwserId) => {
        let questionClone = _.cloneDeep(questions)
        if (type === "ADD") {
            const newAnwser = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = questionClone.findIndex(item => item.id === questionId);
            questionClone[index].answers.push(newAnwser);
            setQuestions(questionClone);
        }

        if (type === "REMOVE") {
            let index = questionClone.findIndex(item => item.id === questionId);
            questionClone[index].answers =
                questionClone[index].answers.filter(item => item.id !== anwserId);
            setQuestions(questionClone);
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === "QUESTION") {
            let questionClone = _.cloneDeep(questions);
            let index = questionClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionClone[index].description = value;
                questionClone[index].isValidQuestion = false;
            }
            setQuestions(questionClone)
        }
    }

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionClone = _.cloneDeep(questions);

        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionClone[index].imageFile = event.target.files[0];
            questionClone[index].imageName = event.target.files[0].name;
        }
        setQuestions(questionClone)
    }

    const handleAnswerQuestion = (type, anwserId, questionId, value) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionClone[index].answers = questionClone[index].answers.map(answer => {
                if (answer.id === anwserId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value;
                    }
                    if (type === 'INPUT') {
                        answer.description = value;
                        answer.isValidAnwser = false;
                    }
                }
                return answer;
            })
            setQuestions(questionClone)
        }
    }

    const handleSubmitQuestionForQuiz = async () => {
        //validate data
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a Quiz!');
            return;
        }

        let questionClone = _.cloneDeep(questions);

        //validate question
        let isValidQ = true;
        let indexQ1 = 0;
        // let questionClone = _.cloneDeep(questions);

        for (let i = 0; i < questionClone.length; i++) {
            if (!questionClone[i].description) {
                isValidQ = false;
                questionClone[i].isValidQuestion = true;
                indexQ1 = i;
                setQuestions(questionClone)
                break;
            }
        }

        if (isValidQ === false) {
            toast.error(`Not empty Description for Question ${indexQ1 + 1}`)
            return;
        }

        //validate answer
        let isValidAnswer = true;
        let indexQ = 0, indexA = 0;
        for (let i = 0; i < questionClone.length; i++) {
            for (let j = 0; j < questionClone[i].answers.length; j++) {
                if (!questionClone[i].answers[j].description) {
                    isValidAnswer = false;
                    questionClone[i].answers[j].isValidAnwser = true;
                    setQuestions(questionClone)
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if (isValidAnswer === false) break;
        }

        if (isValidAnswer === false) {
            toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`)
            return;
        }

        //submit question
        let questionsClone = _.cloneDeep(questions);
        for (let i = 0; i < questionsClone.length; i++) {
            if (questionsClone[i].imageFile) {
                questionsClone[i].imageFile = await toBase64(questionsClone[i].imageFile)
            }
        }

        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionsClone
        })
        if (res && res.EC === 0) {
            toast.success(res.EM);
            fetchQuizWithQA();
        }
    }

    const handlePreviewImg = (questionId) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setDataImgPreview({
                url: URL.createObjectURL(questionClone[index].imageFile),
                title: questionClone[index].imageName
            })
            setIsPreviewImg(true);
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const render = new FileReader();
        render.readAsDataURL(file);
        render.onload = () => resolve(render.result);
        render.onerror = error => reject(error);
    })

    return (
        <div className="questions-container">
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>

                <div className='mt-3 mb-2'>
                    Add Question
                </div>

                {
                    questions && questions.length > 0 &&
                    questions.map((item, index) => {
                        return (
                            <div className='q-main m-4' key={item.id}>
                                <div className='question-content'>
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            placeholder="name@example.com"
                                            value={item.description}
                                            onChange={(event) => handleOnChange('QUESTION', item.id, event.target.value)}
                                            className={`${item.isValidQuestion === true ? 'form-control is-invalid ' : 'form-control'}`}
                                        />
                                        <label>Question's {index + 1} Description</label>
                                    </div>

                                    <div className='group-upload'>
                                        <label htmlFor={`${item.id}`}>
                                            <RiImageAddFill className='label-up' />
                                        </label>
                                        <input
                                            id={`${item.id}`}
                                            type='file'
                                            hidden
                                            onChange={(event) => handleOnChangeFileQuestion(item.id, event)}
                                        />
                                        <span>{
                                            item.imageName ?
                                                <span style={{ cursor: 'pointer' }}
                                                    onClick={() => handlePreviewImg(item.id)}>
                                                    {item.imageName}
                                                </span>
                                                : '0 file is upload'
                                        }
                                        </span>
                                    </div>

                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                                            <BsFillPatchPlusFill className='icon-add' />
                                        </span>
                                        {
                                            questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion("REMOVE", item.id)}>
                                                <BsPatchMinusFill className='icon-remove' />
                                            </span>
                                        }
                                    </div>
                                </div>

                                {
                                    item.answers && item.answers.length > 0 &&
                                    item.answers.map((answer, index) => {
                                        return (
                                            <div className='answers-content' key={answer.id}>
                                                <input
                                                    className="form-check-input isCorrect"
                                                    type="checkbox"
                                                    name="flexRadioDefault"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, item.id, event.target.checked)}
                                                />

                                                <div className="form-floating anwser-name">
                                                    <input
                                                        type="text"
                                                        className={`${answer.isValidAnwser === true ? 'form-control is-invalid' : 'form-control'}`}
                                                        placeholder="name@example.com"
                                                        value={answer.description}
                                                        onChange={(event) => handleAnswerQuestion('INPUT', answer.id, item.id, event.target.value)}
                                                    />
                                                    <label>Answers {index + 1}</label>
                                                </div>

                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer("ADD", item.id)}>
                                                        <AiOutlinePlusCircle className='icon-add' />
                                                    </span>
                                                    {
                                                        item.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer("REMOVE", item.id, answer.id)}>
                                                            <AiOutlineMinusCircle className='icon-remove' />
                                                        </span>
                                                    }

                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        )
                    })
                }

                {
                    questions && questions.length > 0 &&
                    <div className='mb-5'>
                        <button
                            className='btn btn-warning'
                            onClick={() => handleSubmitQuestionForQuiz()}
                        >
                            Save Question
                        </button>
                    </div>
                }

                {
                    isPreviewImg === true &&
                    <Lightbox
                        image={dataImgPreview.url}
                        title={dataImgPreview.title}
                        onClose={() => setIsPreviewImg(false)}
                    />
                }
            </div>

        </div >
    );
}

export default QuizQA;