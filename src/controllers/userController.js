const {
    postUserService, getUserService, putUserService, deleteUserService
} = require('../services/userService');

const getUser = async (req, res) => {
    let users = await getUserService();
    if (users) {
        return res.status(200).json({
            EC: 0,
            data: users,
            mes: 'Get all user'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: users,
            mes: 'Can not get all user from database'
        })
    }
}

const postUser = async (req, res) => {
    let user = await postUserService(req.body);
    if (user) {
        return res.status(200).json({
            EC: 0,
            data: user,
            mes: 'Create a user success'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: user,
            mes: 'Can not create a user from database'
        })
    }
}

const putUser = async (req, res) => {
    let result = await putUserService(req.body);
    if (result) {
        return res.status(200).json({
            EC: 0,
            data: result,
            mes: 'Update a user success'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: result,
            mes: 'Can not update a user from database'
        })
    }
}

const deleteUser = async (req, res) => {
    let id = req.body.id
    let result = await deleteUserService(id);
    if (result) {
        return res.status(200).json({
            EC: 0,
            data: result,
            mes: 'Delete a user success'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            data: result,
            mes: 'Can not delete a user from database'
        })
    }
}

module.exports = {
    getUser, postUser, putUser, deleteUser
}