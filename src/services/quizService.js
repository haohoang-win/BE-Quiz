const Quiz = require('../models/quiz');

const getQuizService = async () => {
    try {
        let result = await Quiz.find({});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const postQuizService = async (dataQuiz) => {
    try {
        let result = await Quiz.create({
            name: dataQuiz.name,
            description: dataQuiz.description,
            image: dataQuiz.image,
            difficulty: dataQuiz.difficulty,
        });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const putQuizService = async (dataUpdateQuiz) => {
    try {
        let { id, name, description, email, difficulty } = dataUpdateQuiz
        let result = await Quiz.updateOne({ _id: id }, { name, description, email, difficulty });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteQuizService = async (id) => {
    try {
        let result = await Quiz.deleteById(id)
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getQuizService,
    postQuizService,
    putQuizService,
    deleteQuizService
}