import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import './ListQuiz.scss'
import { RiMessageLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

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

    return (
        <div className="list-quiz-container container">
            {
                listQuiz && listQuiz.length > 0 &&
                listQuiz.map((item, index) => {
                    return (
                        <div className="card" style={{ width: '18rem' }} key={`quiz-${index}`}>
                            <div className="image">
                                <img src={`data:image /png;base64,${item.image}`} className="card-img-top" alt="..." />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{item.description}</p>
                                <button
                                    className="btn btn-primary  btn-sm btn-block"
                                    onClick={() => navigate(`/detail/${item.id}`)}
                                >
                                    Start Quiz
                                </button>
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