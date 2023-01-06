const express = require('express')
const routerAPI = express.Router()
const {
    getUser, postUser, putUser, deleteUser
} = require('../controllers/userController')
const {
    getQuiz, postQuiz, putQuiz, deleteQuiz
} = require('../controllers/quizController')
const {
    getQuestion, postQuestion, putQuestion, deleteQuestion
} = require('../controllers/questionController')
const {
    getAnswer, postAnswer, putAnswer, deleteAnswer
} = require('../controllers/answerController')

routerAPI.get('/users', getUser);
routerAPI.post('/users', postUser);
routerAPI.put('/users', putUser);
routerAPI.delete('/users/:id', deleteUser);

routerAPI.get('/quizzes', getQuiz);
routerAPI.post('/quizzes', postQuiz);
routerAPI.put('/quizzes', putQuiz);
routerAPI.delete('/quizzes/:id', deleteQuiz);

routerAPI.get('/questions', getQuestion);
routerAPI.post('/questions', postQuestion);
routerAPI.put('/questions', putQuestion);
routerAPI.delete('/questions', deleteQuestion);

routerAPI.get('/answers', getAnswer);
routerAPI.post('/answers', postAnswer);
routerAPI.put('/answers', putAnswer);
routerAPI.delete('/answers', deleteAnswer);

module.exports = routerAPI;