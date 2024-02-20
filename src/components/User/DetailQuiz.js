import Question from "./Question";
import { useLocation, useParams } from "react-router-dom";
import { getQuestionByQuizId, postSubmitQuiz } from "../../services/apiService";
import { useEffect, useState } from "react";
import _, { forEach } from 'lodash';
import './DetailQuiz.scss'
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";

const DetailQuiz = () => {

    let params = useParams();
    let quizId = params.id;
    const location = useLocation()
    const title = location?.state?.quizTitle
    const [dataQuiz, setDataQuiz] = useState('')
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setIsShowModalResult] = useState(false)
    const [dataModalResult, setDataModalResult] = useState({})

    useEffect(() => {
        getDetaiQuizId()
    }, [quizId])

    const getDetaiQuizId = async () => {
        let res = await getQuestionByQuizId(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = []
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    })
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            setDataQuiz(data);
            // console.log(data);
        }
    }
    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1)

    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1)
        }
    }

    const handleFinish = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        };
        let answers = []
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId
                let userAnswerId = [];

                //todo :userAnswerId
                question.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers;
            //submit api
            let res = await postSubmitQuiz(payload);
            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResult(true)
            } else {
                alert('Something wrong...')
            }
        }
    }

    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            question.answers = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            // console.log(b);
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone)
        }
    }
    return (
        <div className="detail-quiz-container">
            <div className="content-left">
                <div className="title">
                    Quiz {quizId}: {title}
                </div>
                <hr />

                <div className="q-content">
                    <Question
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : ''}
                        index={index}
                        handleCheckBox={handleCheckBox}
                    />
                </div>

                <div className="footer">
                    <button className="btn btn-warning" onClick={() => handlePrev()}>
                        Prev
                    </button>
                    <button className="btn btn-primary" onClick={() => handleNext()}>
                        Next
                    </button>
                    <button className="btn btn-info" onClick={() => handleFinish()}>
                        Finish
                    </button>
                </div>
            </div>

            <div className="content-right">
                <RightContent
                    dataQuiz={dataQuiz}
                    handleFinish={handleFinish}
                />
            </div>

            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    );
}

export default DetailQuiz;