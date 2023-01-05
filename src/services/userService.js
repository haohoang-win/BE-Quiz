const User = require('../models/user');
const { uploadSingleFile } = require('./fileService')
const aqp = require('api-query-params');

const getUserService = async (queryString) => {
    try {
        const page = queryString.page;
        const { filter, limit, population } = aqp(queryString);
        delete filter.page;
        let offset = (page - 1) * limit;
        let result = await User.find(filter).populate(population).skip(offset).limit(limit).exec();
        let users = await User.find({});
        let totalUser = users.length;
        let totalPage = (totalUser & 1) ? ((totalUser + 1) / limit) : (totalUser / limit)
        return { result, totalPage };
    } catch (error) {
        console.log(error);
        return null;
    }
}

const postUserService = async (dataUser, file) => {
    try {
        let imageUpload = '';
        if (!!file) {
            imageUpload = await uploadSingleFile(file.image)
        }
        let result = await User.create({
            username: dataUser.username,
            email: dataUser.email,
            image: imageUpload,
            imageB64: dataUser.imageB64
        });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const putUserService = async (dataUpdateUser, file) => {
    try {
        let imageUpload = '';
        if (!!file) {
            imageUpload = await uploadSingleFile(file.image)
        }
        let data = {};
        let { id, username, imageB64 } = dataUpdateUser;
        data.username = username;
        if (imageB64) {
            data.image = imageUpload;
            data.imageB64 = imageB64;
        }
        let result = await User.updateOne({ _id: id }, data);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteUserService = async (id) => {
    try {
        let result = await User.deleteById(id)
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getUserService,
    postUserService,
    putUserService,
    deleteUserService
}