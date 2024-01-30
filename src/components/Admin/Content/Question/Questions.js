import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss'
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const Questions = () => {

    const options = [
        { label: 'EASY', value: 'EASY' },
        { label: 'MIDIUM', value: 'MIDIUM' },
        { label: 'HARD', value: 'HARD' }
    ]

    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: 'question 1',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        descrtiption: 'answer 1',
                        isCorrect: false
                    }
                ]
            }
        ]
    )

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
                        descrtiption: '',
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
                descrtiption: '',
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

        // console.log('check :', type, questionId, anwserDd);
    }

    // console.log('question:', questions);

    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>

            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={selectedQuiz}
                        options={options}
                    />
                </div>

                <div className='mt-3 mb-2'>
                    Add Question
                </div>

                {
                    questions && questions.length > 0 &&
                    questions.map((item, index) => {
                        console.log(item);
                        return (
                            <div className='q-main m-4' key={item.id}>
                                <div className='question-content'>
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={item.description}
                                        />
                                        <label>Question's {index + 1} Description</label>
                                    </div>

                                    <div className='group-upload'>
                                        <label>
                                            <RiImageAddFill className='label-up' />
                                        </label>
                                        <input type='file' hidden />
                                        <span>0 file is upload</span>
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
                                            <div className='answers-content mb-5' key={answer.id}>
                                                <input
                                                    className="form-check-input isCorrect"
                                                    type="checkbox"
                                                    name="flexRadioDefault"
                                                />

                                                <div className="form-floating anwser-name">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                        value={answer.descrtiption}
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
            </div>
        </div >
    );
}

export default Questions;