const express = require('express')
const routerAPI = express.Router()
const {
    getUser, postUser, putUser, deleteUser, getUserAccount
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
const {
    handleRegister, handleLogin, handleLogout
} = require('../controllers/loginRegisterController')
const { checkUserJWT } = require('../middleware/JWTAction')
const { postSeason, getSeason, getSeasonById } = require('../controllers/seasonController')

routerAPI.all('*', checkUserJWT)

routerAPI.post('/register', handleRegister);
routerAPI.post('/login', handleLogin);
routerAPI.get('/logout', handleLogout);
routerAPI.get('/account', getUserAccount)

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

routerAPI.get('/season', getSeason);
routerAPI.get('/season/:id', getSeasonById);
routerAPI.post('/season', postSeason);
routerAPI.put('/questions', putQuestion);
routerAPI.delete('/questions', deleteQuestion);


routerAPI.post('/submit-quiz', submitQuiz);

module.exports = routerAPI;