const { getScheduleInWeekService, postScheduleForClassService, getScheduleForStudentService } = require("../services/scheduleService");

const getScheduleInWeek = async (req, res) => {
    let data = await getScheduleInWeekService(req.query);
    if (data) {
        return res.status(200).json({
            EC: data.EC,
            DT: data.DT,
            EM: data.EM
        })
    } else {
        return res.status(200).json({
            EC: -1,
            DT: [],
            EM: 'Can not create a season from database'
        })
    }
}

const getScheduleForStudent = async (req, res) => {
    let data = await getScheduleForStudentService(req.query, req.user);
    if (data) {
        return res.status(200).json({
            EC: data.EC,
            DT: data.DT,
            EM: data.EM
        })
    } else {
        return res.status(200).json({
            EC: -1,
            DT: [],
            EM: 'Can not create a season from database'
        })
    }
}

const postScheduleForClass = async (req, res) => {
    let data = await postScheduleForClassService(req.body);
    if (data) {
        return res.status(200).json({
            EC: data.EC,
            DT: data.DT,
            EM: data.EM
        })
    } else {
        return res.status(200).json({
            EC: -1,
            DT: [],
            EM: 'Can not create a season from database'
        })
    }
}

module.exports = {
    getScheduleInWeek, postScheduleForClass, getScheduleForStudent
}