const Question = require('../models/question');
const { uploadSingleFile } = require('./fileService')
const _ = require('lodash')

const getQuestionService = async () => {
    try {
        let result = await Question.find({});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const postQuestionService = async (dataQuestion, file) => {
    try {
        if (!dataQuestion.type) {
            let imageUpload = '';
            if (!!file) {
                imageUpload = await uploadSingleFile(file.image, 'questions')
            }
            let objAnswers = `[${dataQuestion.answers}]`
            objAnswers = objAnswers.replace(/\[|\]/g, '').split(',');
            let result = await Question.create({
                description: dataQuestion.description,
                difficulty: dataQuestion.difficulty,
                image: imageUpload,
                imageB64: dataQuestion.imageB64,
                answers: objAnswers
            });
            return result = result;
        }
        if (dataQuestion.type === 'AR-A') {
            let indexDelete = -1;
            let index = -1;
            let myQuestion = await Question.findById(dataQuestion._id).exec();
            let lengthAnswer = myQuestion.answers.length;
            const myQuestionClone = _.cloneDeep(myQuestion);
            if (lengthAnswer < dataQuestion.answers.length) {
                index = lengthAnswer
            }
            myQuestion.description = dataQuestion.description;
            if (!!dataQuestion.imageB64) {
                let imageUpload = await uploadSingleFile(file.image, 'questions')
                myQuestion.image = imageUpload;
                myQuestion.imageB64 = dataQuestion.imageB64
            }
            for (let i = 0; i < lengthAnswer; i++) {
                if (myQuestion.answers[i].toString() !== dataQuestion.answers[i]) {
                    indexDelete = i;
                    index = i;
                    i = lengthAnswer
                }
            }
            if (indexDelete > -1) {
                for (let i = indexDelete; i < lengthAnswer; i++) {
                    myQuestion.answers.pull(myQuestionClone.answers[i]);
                }
            }
            if (index > -1) {
                for (let i = index; i < dataQuestion.answers.length; i++) {
                    myQuestion.answers.push(dataQuestion.answers[i]);
                }
            }
            let result = await myQuestion.save()
            return result;
        }
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