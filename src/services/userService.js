const User = require('../models/user');
const { uploadSingleFile } = require('./fileService')
const aqp = require('api-query-params');
const bcrypt = require('bcryptjs')

var salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    var hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const getUserService = async (queryString, user) => {
    try {
        let result, totalPage;
        const { getEmail, roleUser } = queryString;
        const page = queryString.page;
        const { filter, limit, population } = aqp(queryString);
        delete filter.page;
        let offset = (page - 1) * limit;
        if (!queryString.id) {
            if ((user.role === 'MANAGER' || user.role === 'TEACHER') && (roleUser || getEmail)) {
                result = await User.find({ email: { "$regex": getEmail }, role: { "$regex": roleUser } }).populate(population).skip(offset).limit(limit).exec();
            }
            if ((user.role === 'STUDENT' || user.role === 'TEACHER') && !filter.role && !getEmail && !roleUser) {
                result = await User.findOne({ email: user.email }).populate(population).skip(offset).limit(limit).exec();
            }
            if (limit && !roleUser && !getEmail) {
                result = await User.find(filter).populate(population).skip(offset).limit(limit).exec();
            }
            if (!limit && user.role === 'MANAGER' && !filter.role) {
                result = await User.find({ role: 'TEACHER' }).populate(population).skip(offset).limit(limit).exec();
            }
            if (!limit && filter.role) {
                result = await User.find(filter).populate(population).skip(offset).limit(limit).exec();
            }
            let users = null;
            if (getEmail || roleUser) {
                users = await User.find({ email: { "$regex": getEmail }, role: { "$regex": roleUser } });
            } else {
                users = await User.find({});
            }
            let totalUser = users.length;
            totalPage = (totalUser % limit) === 0 ? (totalUser / limit) : (parseInt(totalUser / limit) + 1)
        } else {
            result = await User.find(filter).populate(population).exec();
            totalPage = 1;
        }
        return ({
            EC: 0,
            DT: result,
            EM: 'Get all user',
            totalPage: totalPage
        })
    } catch (error) {
        console.log(error);
        return {
            EM: 'Something wrong with service',
            EC: 1,
            DT: []
        }
    }
}

const postUserService = async (dataUser, file) => {
    try {
        if (!dataUser.type) {
            let imageUpload = '';
            if (!!file) {
                imageUpload = await uploadSingleFile(file.image, 'users')
            }
            let hashPassword = hashUserPassword('123456')
            let result = await User.create({
                username: dataUser.username,
                email: dataUser.email,
                image: imageUpload,
                imageB64: dataUser.imageB64,
                role: dataUser.role,
                password: hashPassword
            });
            return {
                EM: 'Create a user success',
                EC: 0,
                DT: result
            };
        }
        if (dataUser.type === 'AR-QZ') {
            let user = await User.findById(dataUser.userId).exec();
            user.quizzes = [...user.quizzes, dataUser.quizId]
            let result = await user.save()
            return {
                EM: 'Create a user success',
                EC: 0,
                DT: result
            };
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

const putUserService = async (dataUpdateUser, file) => {
    try {
        let imageUpload = '';
        if (!!file) {
            imageUpload = await uploadSingleFile(file.image, 'users')
        }
        let data = {};
        let { id, username, imageB64, role } = dataUpdateUser;
        data.username = username;
        data.role = role;
        if (imageB64) {
            data.image = imageUpload;
            data.imageB64 = imageB64;
        }
        let result = await User.updateOne({ _id: id }, data);
        return {
            EM: 'Update a user success',
            EC: 0,
            DT: result
        };
    } catch (error) {
        console.log(error);
        return {
            EM: 'Something wrong with service',
            EC: 1,
            DT: []
        }
    }
}

const deleteUserService = async (id) => {
    try {
        let result = await User.deleteById(id)
        return {
            EC: 0,
            DT: result,
            EM: 'Delete a user success'
        };
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
    getUserService,
    postUserService,
    putUserService,
    deleteUserService
}