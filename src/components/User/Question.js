import _ from 'lodash'
import { useState } from 'react';
import Lightbox from "react-awesome-lightbox";

const Question = (props) => {

    const { data, index } = props;
    const [isPreviewImg, setIsPreviewImg] = useState(false)
    const [previewImg, setPreviewImg] = useState('')

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

                        <div onClick={() => setIsPreviewImg(true)} style={{ cursor: 'pointer' }}>
                            {
                                `data:image /png;base64,${data.image}` ?
                                    <img src={`data:image /png;base64,${data.image}`} />
                                    :
                                    <span>Image</span>
                            }
                        </div>
                    </div >
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

            {
                isPreviewImg === true &&
                < Lightbox
                    image={`data:image /png;base64,${data.image}`}
                    // title={dataImgPreview.title}
                    onClose={() => setIsPreviewImg(false)}
                />
            }
        </>
    );
}

export default Question;