import axios from '../utils/axiosCustomize';

const postCreateNewUser = (email, password, username, role, image) => {
    //submit data
    const data = new FormData();
    data.append('email', email)
    data.append('password', password)
    data.append('username', username)
    data.append('role', role)
    data.append('userImage', image)

    return axios.post('api/v1/participant', data);
}

const getAllUser = () => {
    return axios.get(`api/v1/participant/all`);
}

const putUpdateNewUser = (id, username, role, image) => {
    //submit data
    const data = new FormData();
    data.append('id', id)
    data.append('username', username)
    data.append('role', role)
    data.append('userImage', image)

    return axios.put(`api/v1/participant`, data);
}

const deleteUser = (userId) => {
    return axios.delete(`api/v1/participant`, { data: { id: userId } });
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLoginUser = (email, password) => {
    return axios.post(`api/v1/login`, { email, password, delay: 3000 })
}

const postRegisterUser = (email, username, password) => {
    return axios.post(`api/v1/register`, { email, username, password })
}

const getQuizByUser = () => {
    return axios.get(`api/v1/quiz-by-participant`)
}

const getQuestionByQuizId = (id) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`)
}

const postSubmitQuiz = (data) => {
    return axios.post(`/api/v1/quiz-submit`, { ...data })
}

const postCreateNewQuiz = (name, description, difficulty, quizImage) => {
    //submit data
    const data = new FormData();
    data.append('name', name)
    data.append('description', description)
    data.append('difficulty', difficulty)
    data.append('quizImage', quizImage)

    return axios.post(`/api/v1/quiz`, data);
}

const getAllQuizForAdmin = () => {
    return axios.get(`/api/v1/quiz/all`)
}

const deleteQuiz = (id) => {
    return axios.delete(`/api/v1/quiz/${id}`)
}

const putUpdateNewQuiz = (id, name, description, difficulty, quizImage) => {
    //submit data
    const data = new FormData();
    data.append('id', id)
    data.append('name', name)
    data.append('description', description)
    data.append('difficulty', difficulty)
    data.append('quizImage', quizImage)

    return axios.put(`api/v1/quiz`, data);
}

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
    //submit data
    const data = new FormData();
    data.append('quiz_id', quiz_id)
    data.append('description', description)
    data.append('questionImage', questionImage)

    return axios.post(`/api/v1/question`, data)
}

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post(`/api/v1/answer`, {
        description: description,
        correct_answer: correct_answer,
        question_id, question_id
    })
}

const postAssignQuizToUser = (quizId, userId) => {
    return axios.post(`/api/v1/quiz-assign-to-user`, { quizId, userId })
}

const getQuizWithQA = (id) => {
    return axios.get(`/api/v1/quiz-with-qa/${id}`)
}

const postUpsertQA = (data) => {
    return axios.post(`/api/v1/quiz-upsert-qa`, { ...data })
}

const postLogOut = (email, refreshToken) => {
    return axios.post(`/api/v1/logout`, {
        email: email,
        refresh_token: refreshToken
    })
}

const getOverview = () => {
    return axios.get(`/api/v1/overview`)
}

const postUpdateProfile = (username, userImage) => {
    const data = new FormData();
    data.append('username', username)
    data.append('userImage', userImage)
    return axios.post(`/api/v1/profile`, data)
}

export {
    postCreateNewUser, getAllUser, putUpdateNewUser, deleteUser,
    getUserWithPaginate, postLoginUser, postRegisterUser, getQuizByUser,
    getQuestionByQuizId, postSubmitQuiz, postCreateNewQuiz, getAllQuizForAdmin,
    deleteQuiz, putUpdateNewQuiz, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion,
    postAssignQuizToUser, getQuizWithQA, postUpsertQA, postLogOut, getOverview, postUpdateProfile
}