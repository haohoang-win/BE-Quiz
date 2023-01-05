const User = require('../models/user');

const getUserService = async () => {
    try {
        let result = await User.find({});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const postUserService = async (dataUser) => {
    try {
        let result = await User.create({
            username: dataUser.username,
            email: dataUser.email,
            image: dataUser.image,
        });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const putUserService = async (dataUpdateUser) => {
    try {
        let { id, username, email } = dataUpdateUser
        let result = await User.updateOne({ _id: id }, { username, email });
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