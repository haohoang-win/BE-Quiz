require('dotenv').config();
const { registerNewUser, handleUserLogin } = require('../services/loginRegisterService')

const handleRegister = async (req, res) => {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            return res.status(200).json({
                EM: 'missing required parameters',
                EC: '1',
                DT: ''
            })
        }
        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: 'Your password must have more than 3 letters',
                EC: '1',
                DT: ''
            })
        }

        // service
        let data = await registerNewUser(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from sever',
            EC: -1,
            DT: ''
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        let data = await handleUserLogin(req.body)
        // set cookie
        console.log(data);
        if (data && data.DT && data.DT.access_token) {
            res.cookie('jwt', data.DT.access_token, {
                httpOnly: true, maxAge: 2 * 60 * 60 * 1000,
                sameSite: "none",
                secure: true,
                domain: "haohoang-frontend-quiz.vercel.app"
            })
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: ''
        })
    }
}

const handleLogout = (req, res) => {
    try {
        res.clearCookie('jwt')
        return res.status(200).json({
            EM: 'clear cookie done',
            EC: 0,
            DT: ''
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: ''
        })
    }
}

module.exports = {
    handleRegister,
    handleLogin,
    handleLogout
}