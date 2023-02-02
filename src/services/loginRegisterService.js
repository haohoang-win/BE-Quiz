const bcrypt = require('bcryptjs')
const User = require('../models/user');
const { createJWT } = require('../middleware/JWTAction')

require('dotenv').config();

var salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    var hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkEmailExist = async (userEmail) => {
    let user = await User.findOne({ email: userEmail })
    if (user) {
        return true;
    }
    return false;
}

const registerNewUser = async (rawUserData) => {
    try {
        // check email/phonenumber are exist
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: 'The email is already exist',
                EC: 1,
                DT: []
            }
        }

        // hash user password
        let hashPassword = hashUserPassword(rawUserData.password)

        // create new user
        let result = await User.create({
            username: rawUserData.username,
            email: rawUserData.email,
            role: 'STUDENT',
            password: hashPassword
        });

        return {
            EM: 'A User is created succesfully',
            EC: 0,
            DT: result
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'Something wrongs is service...',
            EC: -2,
            DT: []
        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword)
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await User.findOne({ email: rawData.email })
        if (user) {
            let isCorrectPassword = checkPassword(rawData.password, user.password)
            if (isCorrectPassword === true) {
                // test roles:
                let payload = {
                    email: user.email,
                    username: user.username,
                    role: user.role
                }
                let token = createJWT(payload)

                return {
                    EM: 'Oke',
                    EC: 0,
                    DT: {
                        access_token: token,
                        email: user.email,
                        username: user.username,
                        role: user.role
                    }
                }
            }
        }
        return {
            EM: 'Your email/phone number or password is incorrect',
            EC: 1
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'Something wrongs is service...',
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser,
    handleUserLogin,
    hashUserPassword,
    checkEmailExist,
}