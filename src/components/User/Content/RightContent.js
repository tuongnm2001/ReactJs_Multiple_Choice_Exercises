import { useRef, useState } from 'react';
import CountDown from './CountDown';

const RightContent = (props) => {

    let { dataQuiz, handleFinish, setIndex } = props

    const refDiv = useRef([]);

    const onTimeUp = () => {
        handleFinish();
    }

    const getClassQuestion = (question, index) => {
        if (question && question.answers.length > 0) {
            let isChecked = question.answers.find(a => a.isSelected === true)
            if (isChecked) {
                return "question selected"
            }
            return "question"
        }
    }

    const handleClickQuetion = (question, index) => {
        setIndex(index)
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === "question clicked") {
                    item.className = "question"
                }
            })
        }

        if (question && question.answers.length > 0) {
            let isChecked = question.answers.find(a => a.isSelected === true)
            if (isChecked) {
                return;
            }
        }
        refDiv.current[index].className = "question clicked"
    }

    return (
        <>
            <div className="main-timer">
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>

            <div className="main-question">
                {
                    dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div key={`q-${index}`}>
                                <div
                                    className={getClassQuestion(item, index)}
                                    onClick={() => handleClickQuetion(item, index)}
                                    ref={element => refDiv.current[index] = element}
                                >
                                    {index + 1}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

export default RightContent;