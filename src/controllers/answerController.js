const {
    postAnswerService, getAnswerService, putAnswerService, deleteAnswerService, getAnswerByIdService
} = require('../services/answerService');

const getAnswer = async (req, res) => {
    let answers = await getAnswerService();
    if (answers) {
        return res.status(200).json({
            EC: 0,
            data: answers,
            mes: 'Get all answer'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: answers,
            mes: 'Can not get all answer from database'
        })
    }
}

const postAnswer = async (req, res) => {
    let answer = await postAnswerService(req.body);
    if (answer) {
        return res.status(200).json({
            EC: 0,
            data: answer,
            mes: 'Create a answer success'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: answer,
            mes: 'Can not create a answer from database'
        })
    }
}

const putAnswer = async (req, res) => {
    let result = await putAnswerService(req.body);
    if (result) {
        return res.status(200).json({
            EC: 0,
            data: result,
            mes: 'Update a answer success'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: result,
            mes: 'Can not update a answer from database'
        })
    }
}

const deleteAnswer = async (req, res) => {
    let id = req.body.id
    let result = await deleteAnswerService(id);
    if (result) {
        return res.status(200).json({
            EC: 0,
            data: result,
            mes: 'Delete a answer success'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: result,
            mes: 'Can not delete a answer from database'
        })
    }
}

const getAnswerByID = async (req, res) => {
    let id = req.params.id
    let result = await getAnswerByIdService(id)
    return res.status(200).json({
        EC: 0,
        data: result,
    })
}

module.exports = {
    getAnswer, postAnswer, putAnswer, deleteAnswer, getAnswerByID
}