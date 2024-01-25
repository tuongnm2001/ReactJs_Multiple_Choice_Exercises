import { useParams } from "react-router-dom";
import { getQuestionByQuizId } from "../../services/apiService";
import { useEffect } from "react";

const DetailQuiz = () => {

    let params = useParams();
    let quizId = params.id;

    useEffect(() => {
        getDetaiQuizId()
    }, [quizId])

    const getDetaiQuizId = async () => {
        let data = await getQuestionByQuizId(quizId);
        console.log('check datab : ', data);
    }

    return (
        <div>DetailQuiz</div>
    );
}

export default DetailQuiz;