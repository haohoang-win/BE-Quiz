const Answer = require('../models/answer');

const getAnswerService = async () => {
    try {
        let result = await Answer.find({});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const postAnswerService = async (dataAnswer) => {
    try {
        let result = await Answer.create({
            description: dataAnswer.description,
            isCorrect: dataAnswer.isCorrect,
        });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const putAnswerService = async (dataUpdateAnswer) => {
    try {
        let { _id, description, isCorrect } = dataUpdateAnswer
        let result = await Answer.updateOne({ _id: _id }, { description, isCorrect });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteAnswerService = async (id) => {
    try {
        let result = await Answer.deleteById(id)
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAnswerByIdService = async (id) => {
    try {
        let result = await Answer.findById(id)
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getAnswerService,
    postAnswerService,
    putAnswerService,
    deleteAnswerService,
    getAnswerByIdService
}