import _ from 'lodash'

const Question = (props) => {

    const { data, index } = props;

    if (_.isEmpty(data)) {
        return (<></>)
    }

    const handleCheck = (event, aId, qId) => {
        // console.log('check event : ', event.isTrusted);
        // console.log('>>data :', aId, qId);
        props.handleCheckBox(aId, qId)
    }

    return (
        <>
            {
                data.image ?
                    <div className='q-image'>
                        <img src={`data:image /png;base64,${data.image}`} className="img-thumbnail" alt="..." />
                    </div>
                    :
                    <div className='no-image'>

                    </div>
            }

            <b style={{ color: 'red', fontStyle: 'italic' }}>Choose only 1 answer</b>
            <div className="question">Question {index + 1}: {data.questionDescription} ?</div>

            <div className="answer">
                {
                    data.answers && data.answers.length > 0 &&
                    data.answers.map((item, index) => {
                        return (
                            <div key={`anwser-${index}`} className="a-child">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={item.isSelected}
                                        name="flexRadioDefault"
                                        onChange={(event) => handleCheck(event.target, item.id, data.questionId)}
                                    />
                                    <label className="form-check-label">
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