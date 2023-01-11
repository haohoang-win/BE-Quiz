const {
    postQuestionService, getQuestionService, getQuestionByIdService, putQuestionService, deleteQuestionService
} = require('../services/questionService');

const getQuestion = async (req, res) => {
    let questions = await getQuestionService();
    if (questions) {
        return res.status(200).json({
            EC: 0,
            data: questions,
            mes: 'Get all question'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: questions,
            mes: 'Can not get all question from database'
        })
    }
}

const getQuestionById = async (req, res) => {
    let questions = await getQuestionByIdService(req.params.id)
    if (questions) {
        return res.status(200).json({
            EC: 0,
            data: questions,
            mes: 'Get all question'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: questions,
            mes: 'Can not get all question from database'
        })
    }
}

const postQuestion = async (req, res) => {
    let question = await postQuestionService(req.body, req.files);
    if (question) {
        return res.status(200).json({
            EC: 0,
            data: question,
            mes: 'Create a question success'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: question,
            mes: 'Can not create a question from database'
        })
    }
}

const putQuestion = async (req, res) => {
    let result = await putQuestionService(req.body);
    if (result) {
        return res.status(200).json({
            EC: 0,
            data: result,
            mes: 'Update a question success'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: result,
            mes: 'Can not update a question from database'
        })
    }
}

const deleteQuestion = async (req, res) => {
    let id = req.body.id
    let result = await deleteQuestionService(id);
    if (result) {
        return res.status(200).json({
            EC: 0,
            data: result,
            mes: 'Delete a question success'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: result,
            mes: 'Can not delete a question from database'
        })
    }
}

module.exports = {
    getQuestion, getQuestionById, postQuestion, putQuestion, deleteQuestion
}