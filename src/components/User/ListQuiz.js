import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import './ListQuiz.scss'
import { RiMessageLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';

const ListQuiz = (props) => {

    const [listQuiz, setListQuiz] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getQuizData()
    }, [])

    const getQuizData = async () => {
        let res = await getQuizByUser();
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }
    const sortListQuiz = _.sortBy(listQuiz, 'id');

    return (
        <div className="list-quiz-container container mb-4">
            {
                sortListQuiz && sortListQuiz.length > 0 &&
                sortListQuiz.map((item, index) => {
                    console.log(item);
                    return (
                        <div className="card" style={{ width: '16rem' }} key={`quiz-${index}`}>
                            <div className="image">
                                <img src={`data:image /png;base64,${item.image}`} className="card-img-top" alt="..." />
                            </div>
                            <div className="c-bottom">
                                <div className="card-body">
                                    <h5 className="card-title">Quiz {item.id}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <button
                                        className="btn btn-primary  btn-sm btn-block btn-start"
                                        onClick={() => navigate(`/detail/${item.id}`, { state: { quizTitle: item.description } })}
                                    >
                                        Start Quiz
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

            {
                listQuiz && listQuiz.length === 0 &&
                <div className="alert alert-warning col-12" role="alert">
                    <RiMessageLine /> You don't have any quiz
                </div>
            }

        </div>

    );
}

export default ListQuiz;