import CountDown from './CountDown';

const RightContent = (props) => {

    let { dataQuiz, handleFinish } = props

    const onTimeUp = () => {
        handleFinish();
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
                                <div className="question">
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