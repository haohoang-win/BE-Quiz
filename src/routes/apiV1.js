const express = require('express')
const routerAPI = express.Router()
const {
    getUser, postUser, putUser, deleteUser
} = require('../controllers/userController')
const {
    getQuiz, getQuizById, postQuiz, putQuiz, deleteQuiz, submitQuiz
} = require('../controllers/quizController')
const {
    getQuestion, getQuestionById, postQuestion, putQuestion, deleteQuestion
} = require('../controllers/questionController')
const {
    getAnswer, postAnswer, putAnswer, deleteAnswer, getAnswerByID
} = require('../controllers/answerController')

routerAPI.get('/users', getUser);
routerAPI.post('/users', postUser);
routerAPI.put('/users', putUser);
routerAPI.delete('/users/:id', deleteUser);

routerAPI.get('/quizzes', getQuiz);
routerAPI.get('/quizzes/:id', getQuizById);
routerAPI.post('/quizzes', postQuiz);
routerAPI.put('/quizzes', putQuiz);
routerAPI.delete('/quizzes/:id', deleteQuiz);

routerAPI.get('/questions', getQuestion);
routerAPI.get('/questions/:id', getQuestionById);
routerAPI.post('/questions', postQuestion);
routerAPI.put('/questions', putQuestion);
routerAPI.delete('/questions', deleteQuestion);

routerAPI.get('/answers', getAnswer);
routerAPI.get('/answers/:id', getAnswerByID);
routerAPI.post('/answers', postAnswer);
routerAPI.put('/answers', putAnswer);
routerAPI.delete('/answers', deleteAnswer);

routerAPI.post('/submit-quiz', submitQuiz);

module.exports = routerAPI;