const {
    postQuizService, getQuizService, getQuizByIdService, putQuizService, deleteQuizService, submitQuizService
} = require('../services/quizService');

const getQuiz = async (req, res) => {
    let quizzes = await getQuizService(req.query);
    if (quizzes) {
        return res.status(200).json({
            EC: 0,
            data: quizzes.result,
            mes: 'Get all quiz',
            totalPage: quizzes.totalPage ? quizzes.totalPage : 'ALL'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: quizzes,
            mes: 'Can not get all quiz from database'
        })
    }
}

const getQuizById = (req, res) => {
    setTimeout(async () => {
        let id = req.params.id
        let result = await getQuizByIdService(id, req.query);
        if (result) {
            return res.status(200).json({
                EC: 0,
                data: result,
                mes: 'Get quiz by id',
            })
        } else {
            return res.status(200).json({
                EC: -1,
                data: result,
                mes: 'Can not get quiz by id from database'
            })
        }
    }, 1000)
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

const submitQuiz = async (req, res) => {
    let result = await submitQuizService(req.body, req.query);
    if (result) {
        return res.status(200).json({
            EC: 0,
            data: result,
            mes: `You've submitted.`
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: result,
            mes: `Can't access to database`
        })
    }
}

module.exports = {
    getQuiz, getQuizById, postQuiz, putQuiz, deleteQuiz, submitQuiz
}