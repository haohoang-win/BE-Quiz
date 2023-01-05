const Question = require('../models/question');

const getQuestionService = async () => {
    try {
        let result = await Question.find({});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const postQuestionService = async (dataQuestion) => {
    try {
        let result = await Question.create({
            name: dataQuestion.name,
            description: dataQuestion.description,
            image: dataQuestion.image,
        });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const putQuestionService = async (dataUpdateQuestion) => {
    try {
        let { id, description, email, difficulty } = dataUpdateQuestion
        let result = await Question.updateOne({ _id: id }, { description, email, difficulty });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteQuestionService = async (id) => {
    try {
        let result = await Question.deleteById(id)
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getQuestionService,
    postQuestionService,
    putQuestionService,
    deleteQuestionService
}