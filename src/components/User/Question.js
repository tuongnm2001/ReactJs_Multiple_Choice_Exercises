import _ from 'lodash'

const Question = (props) => {

    const { data, index } = props;

    if (_.isEmpty(data)) {
        return (<></>)
    }
    console.log(data);
    return (
        <>
            {
                data.image &&
                <div className='q-image'>
                    <img src={`data:image /png;base64,${data.image}`} />
                </div>
            }

            <div className="question">Question {index + 1}: {data.questionDescription} ?</div>

            <div className="answer">
                {
                    data.answers && data.answers.length > 0 &&
                    data.answers.map((item, index) => {
                        return (
                            <div key={`anwser-${index}`} className="a-child">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" />
                                    <label className="form-check-label" >
                                        {item.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>
    );
}

export default Question;