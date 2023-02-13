const Class = require('../models/class')

const postClassOfTeacherService = async (body) => {
    try {
        const { _id, teacherObject } = body
        let result = await Class.find({ teacherObject: teacherObject })
        if (result) {
            return ({
                EC: 0,
                DT: result,
                EM: 'Update success',
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

module.exports = {
    postClassOfTeacherService
}