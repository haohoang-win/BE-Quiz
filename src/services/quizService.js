const Quiz = require('../models/quiz');
const { uploadSingleFile } = require('./fileService')
const aqp = require('api-query-params');

const getQuizService = async (queryString) => {
    try {
        const page = queryString.page;
        const { filter, limit, population } = aqp(queryString);
        delete filter.page;
        let offset = (page - 1) * limit;
        let result = await Quiz.find(filter).populate(population).skip(offset).limit(limit).exec();
        let quizzes = await Quiz.find({});
        let totalQuiz = quizzes.length;
        let totalPage = (totalQuiz % limit) === 0 ? (totalQuiz / limit) : (parseInt(totalQuiz / limit) + 1)
        return { result, totalPage };
    } catch (error) {
        console.log(error);
        return null;
    }
}

const postQuizService = async (dataQuiz, file) => {
    try {
        let imageUpload = '';
        if (!!file) {
            imageUpload = await uploadSingleFile(file.image, 'quizzes')
        }
        let result = await Quiz.create({
            name: dataQuiz.name,
            description: dataQuiz.description,
            difficulty: dataQuiz.difficulty,
            image: imageUpload,
            imageB64: dataQuiz.imageB64,
        });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const putQuizService = async (dataUpdateQuiz, file) => {
    try {
        let imageUpload = '';
        if (!!file) {
            imageUpload = await uploadSingleFile(file.image, 'quizzes')
        }
        let data = {};
        let { id, description, imageB64 } = dataUpdateQuiz;
        data.description = description;
        if (imageB64) {
            data.image = imageUpload;
            data.imageB64 = imageB64;
        }
        let result = await Quiz.updateOne({ _id: id }, data);
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