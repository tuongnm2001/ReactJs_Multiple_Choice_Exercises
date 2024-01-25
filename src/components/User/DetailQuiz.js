import { useLocation, useParams } from "react-router-dom";
import { getQuestionByQuizId } from "../../services/apiService";
import { useEffect, useState } from "react";
import _ from 'lodash';
import './DetailQuiz.scss'
import Question from "./Question";

const DetailQuiz = () => {

    let params = useParams();
    let quizId = params.id;
    const location = useLocation()
    const title = location?.state?.quizTitle
    const [dataQuiz, setDataQuiz] = useState('')
    const [index, setIndex] = useState(0);

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
                        answers.push(item.answers);
                    })
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            setDataQuiz(data);
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
    return (
        <div className="detail-quiz-container">
            <div className="content-left">
                <div className="title">
                    Quiz {quizId}: {title}
                </div>
                <hr />
                <div className="q-body">
                    <img />
                </div>

                <div className="q-content">
                    <Question
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : ''}
                        index={index}
                    />
                </div>

                <div className="footer">
                    <button className="btn btn-warning" onClick={() => handlePrev()}>Prev</button>
                    <button className="btn btn-primary" onClick={() => handleNext()}>Next</button>
                </div>
            </div>

            <div className="content-right">
                Count Down
            </div>
        </div>
    );
}

export default DetailQuiz;