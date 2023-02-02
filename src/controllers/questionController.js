const {
    postQuestionService, getQuestionService, getQuestionByIdService, putQuestionService, deleteQuestionService
} = require('../services/questionService');

const getQuestion = async (req, res) => {
    let questions = await getQuestionService();
    if (questions) {
        return res.status(200).json({
            EC: 0,
            DT: questions,
            EM: 'Get all question'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            DT: questions,
            EM: 'Can not get all question from database'
        })
    }
}

const getQuestionById = async (req, res) => {
    let questions = await getQuestionByIdService(req.params.id)
    if (questions) {
        return res.status(200).json({
            EC: 0,
            DT: questions,
            EM: 'Get all question'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            DT: questions,
            EM: 'Can not get all question from database'
        })
    }
}

const postQuestion = async (req, res) => {
    let question = await postQuestionService(req.body, req.files);
    if (question) {
        return res.status(200).json({
            EC: 0,
            DT: question,
            EM: 'Create a question success'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            DT: question,
            EM: 'Can not create a question from database'
        })
    }
}

const putQuestion = async (req, res) => {
    let result = await putQuestionService(req.body);
    if (result) {
        return res.status(200).json({
            EC: 0,
            DT: result,
            EM: 'Update a question success'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            DT: result,
            EM: 'Can not update a question from database'
        })
    }
}

const deleteQuestion = async (req, res) => {
    let id = req.body.id
    let result = await deleteQuestionService(id);
    if (result) {
        return res.status(200).json({
            EC: 0,
            DT: result,
            EM: 'Delete a question success'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            DT: result,
            EM: 'Can not delete a question from database'
        })
    }
}

module.exports = {
    getQuestion, getQuestionById, postQuestion, putQuestion, deleteQuestion
}