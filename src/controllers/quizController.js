const {
    postQuizService, getQuizService, putQuizService, deleteQuizService
} = require('../services/quizService');

const getQuiz = async (req, res) => {
    let quizzes = await getQuizService(req.query);
    if (quizzes) {
        return res.status(200).json({
            EC: 0,
            data: quizzes.result,
            mes: 'Get all quiz',
            totalPage: quizzes.totalPage
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: quizzes,
            mes: 'Can not get all quiz from database'
        })
    }
}

const postQuiz = async (req, res) => {
    let quiz = await postQuizService(req.body, req.files);
    if (quiz) {
        return res.status(200).json({
            EC: 0,
            data: quiz,
            mes: 'Create a quiz success'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: quiz,
            mes: 'Can not create a quiz from database'
        })
    }
}

const putQuiz = async (req, res) => {
    let result = await putQuizService(req.body, req.files);
    if (result) {
        return res.status(200).json({
            EC: 0,
            data: result,
            mes: 'Update a quiz success'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: result,
            mes: 'Can not update a quiz from database'
        })
    }
}

const deleteQuiz = async (req, res) => {
    let id = req.params.id
    let result = await deleteQuizService(id);
    if (result) {
        return res.status(200).json({
            EC: 0,
            data: result,
            mes: 'Delete a quiz success'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: result,
            mes: 'Can not delete a quiz from database'
        })
    }
}

module.exports = {
    getQuiz, postQuiz, putQuiz, deleteQuiz
}