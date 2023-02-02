const Quiz = require('../models/quiz');
const { uploadSingleFile } = require('./fileService')
const aqp = require('api-query-params');
const _ = require('lodash')

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
        return {
            EM: 'Something wrong with service',
            EC: 1,
            DT: []
        }
    }
}

const getQuizByIdService = async (quizId, queryString) => {
    try {
        const { population } = aqp(queryString);
        let result = await Quiz.findById(quizId).populate(population).exec();
        return result;
    } catch (error) {
        console.log(error);
        return {
            EM: 'Something wrong with service',
            EC: 1,
            DT: []
        }
    }
}

const postQuizService = async (dataQuiz, file) => {
    try {
        if (!dataQuiz.type) {
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
        }
        if (dataQuiz.type = 'AR-Q') {
            let indexDelete = -1;
            let index = -1;
            let myQuiz = await Quiz.findById(dataQuiz.quizId).exec();
            let lengthQuestion = myQuiz.questions.length;
            const myQuizClone = _.cloneDeep(myQuiz);
            if (lengthQuestion < dataQuiz.arrQuestionId.length) {
                index = lengthQuestion
            }
            for (let i = 0; i < lengthQuestion; i++) {
                if (myQuiz.questions[i].toString() !== dataQuiz.arrQuestionId[i]) {
                    indexDelete = i;
                    index = i;
                    i = lengthQuestion
                }
            }
            if (indexDelete > -1) {
                for (let i = indexDelete; i < lengthQuestion; i++) {
                    myQuiz.questions.pull(myQuizClone.questions[i]);
                }
            }
            if (index > -1) {
                for (let i = index; i < dataQuiz.arrQuestionId.length; i++) {
                    myQuiz.questions.push(dataQuiz.arrQuestionId[i]);
                }
            }
            let result = await myQuiz.save()
            return result;
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'Something wrong with service',
            EC: 1,
            DT: []
        }
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
        return {
            EM: 'Something wrong with service',
            EC: 1,
            DT: []
        }
    }
}

const deleteQuizService = async (id) => {
    try {
        let result = await Quiz.deleteById(id)
        return result;
    } catch (error) {
        console.log(error);
        return {
            EM: 'Something wrong with service',
            EC: 1,
            DT: []
        }
    }
}

const submitQuizService = async (dataSubmit, queryString) => {
    try {
        const { population } = aqp(queryString);
        const { id } = dataSubmit
        let myQuiz = await Quiz.findById(id).populate(population).exec();
        let arrQuestion = myQuiz.questions;
        let resultSubmit = arrQuestion.map(question => {
            if (question && question.answers && question.answers.length > 0) {
                let index = question.answers.findIndex(answer => answer.isCorrect === true);
                return index;
            } else {
                return -1;
            }
        })
        return resultSubmit;
    } catch (error) {
        console.log(error);
        return {
            EM: 'Something wrong with service',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getQuizService,
    getQuizByIdService,
    postQuizService,
    putQuizService,
    deleteQuizService,
    submitQuizService
}