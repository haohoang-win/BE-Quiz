const Schedule = require('../models/schedule')
const Class = require('../models/class')

const getScheduleInWeekService = async (queryString) => {
    try {
        let { idClass, season, weekNumber } = queryString
        let checkExist = await Schedule.find({ class: idClass, season, weekNumber, status: true })

        return ({
            EC: 0,
            DT: checkExist ? checkExist : [],
            EM: 'Find all schedule',
        })
    } catch (error) {
        return {
            EM: 'Something wrong with service',
            EC: 1,
            DT: []
        }
    }
}

const getScheduleForStudentService = async (queryString, user) => {
    try {
        let { season, weekNumber } = queryString
        let { _id } = user
        let checkClass = await Class.find({ year: season, students: _id })
        if (checkClass) {
            let idClass = checkClass[0]._id;
            let result = await Schedule.find({ weekNumber, season, class: idClass, status: true })
            return ({
                EC: 0,
                DT: result,
                EM: 'Find all schedule',
            })
        } else {
            return ({
                EC: 1,
                DT: [],
                EM: 'Cannot find class',
            })
        }
    } catch (error) {
        return {
            EM: 'Something wrong with service',
            EC: 1,
            DT: []
        }
    }
}

const postScheduleForClassService = async (body) => {
    try {
        let { arrNewSchedule, arrDeleteSchedule } = body;
        let result = [];
        let checkExist = await Schedule.find({ $or: [{ ...arrNewSchedule[0] }, { ...arrNewSchedule[1] }] })
        if (checkExist.length === 0) {
            arrNewSchedule[0].status = true;
            arrNewSchedule[1].status = true;
            result = await Schedule.insertMany(arrNewSchedule)
        }
        if (checkExist.length === 1) {
            if (!checkExist[0].status) {
                checkExist[0].status = true
                checkExist[0].save()
            }
            let newArr = arrNewSchedule.find(item => item.day !== checkExist[0].day || item.time !== checkExist[0].time)
            newArr.status = true;
            result = await Schedule.create(newArr)
        }
        if (checkExist.length === 2) {
            if (!checkExist[0].status || !checkExist[1].status) {
                checkExist[0].status = true
                checkExist[1].status = true
                checkExist[0].save()
                checkExist[1].save()
            }
            result = checkExist;
        }
        if (arrDeleteSchedule.length > 0) {
            arrDeleteSchedule.forEach(async (item) => {
                await Schedule.findOneAndUpdate(item, { status: false })
            })
        }
        return ({
            EC: 0,
            DT: result,
            EM: 'Create schedule',
        })
    } catch (error) {
        return {
            EM: 'Something wrong with service',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getScheduleInWeekService, postScheduleForClassService, getScheduleForStudentService
}