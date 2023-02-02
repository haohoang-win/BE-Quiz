const {
    postUserService, getUserService, putUserService, deleteUserService
} = require('../services/userService');

const getUser = async (req, res) => {
    let users = await getUserService(req.query);
    if (users) {
        return res.status(200).json({
            EC: users.EC,
            DT: users.DT,
            EM: users.EM,
            totalPage: users.totalPage ? users.totalPage : []
        })
    } else {
        return res.status(200).json({
            EC: -1,
            DT: [],
            EM: 'Can not get all user from database'
        })
    }
}

const postUser = async (req, res) => {
    let user = await postUserService(req.body, req.files);
    if (user) {
        return res.status(200).json({
            EC: user.EC,
            DT: user.DT,
            EM: user.EM
        })
    } else {
        return res.status(200).json({
            EC: -1,
            DT: [],
            EM: 'Can not create a user from database'
        })
    }
}

const putUser = async (req, res) => {
    let result = await putUserService(req.body, req.files);
    if (result) {
        return res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
        })
    } else {
        return res.status(200).json({
            EC: -1,
            DT: [],
            EM: 'Can not update a user from database'
        })
    }
}

const deleteUser = async (req, res) => {
    let id = req.params.id
    let result = await deleteUserService(id);
    if (result) {
        return res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
        })
    } else {
        return res.status(200).json({
            EC: -1,
            DT: [],
            EM: 'Can not delete a user from database'
        })
    }
}

module.exports = {
    getUser, postUser, putUser, deleteUser
}