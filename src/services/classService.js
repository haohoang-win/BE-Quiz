const Class = require('../models/class')
const User = require('../models/user')
const aqp = require('api-query-params');

const getClassByIdService = async (id, queryString) => {
    try {
        const { population } = aqp(queryString);
        let result = await Class.findById(id).populate(population).exec();
        if (result) {
            return ({
                EC: 0,
                DT: result,
                EM: 'Find a Id',
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

const getClassBySeasonService = async (season, id) => {
    try {
        season = season.replace('-', '/')
        let result = await Class.find({ year: season, teacherObject: id }).exec();
        if (result) {
            return ({
                EC: 0,
                DT: result,
                EM: 'Find all class',
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

const deleteManyClassService = async (arrId) => {
    try {
        if (arrId && arrId.length > 0) {
            arrId.forEach(async (id) => {
                await Class.deleteById(id);
            })
        }
        return ({
            EC: 0,
            DT: result,
            EM: 'Delete Ids success',
        })
    } catch (error) {
        return {
            EM: 'Something wrong with service',
            EC: 1,
            DT: []
        }
    }
}

const postStudentForClassService = async (body) => {
    try {
        const { _id, students, arrRemoveStudent, arrChangeStudent, seasonId } = body
        let result = await Class.findByIdAndUpdate(_id, { students: students }, { new: true })
        if (result) {
            if (arrChangeStudent && arrChangeStudent.length > 0) {
                const newArr = arrChangeStudent.filter(element => !result.students.includes(element));
                newArr.forEach(async (idStudent) => {
                    let student = await User.findById(idStudent);
                    student.seasons.pull(seasonId);
                    student.classes.pull(_id);
                    student.save()
                })
            }
            if (arrRemoveStudent && arrRemoveStudent.length > 0) {
                const newArr = arrRemoveStudent.filter(element => !result.students.includes(element));
                newArr.forEach(async (idStudent) => {
                    let student = await User.findById(idStudent);
                    student.seasons.pull(seasonId);
                    student.classes.pull(_id);
                    student.save()
                })
            }
            result.students.forEach(async (studentId) => {
                let student = await User.findById(studentId);
                let checkExist = student.classes.length > 0 ? student.classes.filter(value =>
                    [result._id.toString()].some(element => value.toString().includes(element))
                ) : []
                if (checkExist.length === 0) {
                    student.classes.push(result._id)
                    student.seasons.push(seasonId);
                }
                student.save()
            })
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

const postSubjectTeacherForClassService = async (body) => {
    try {
        const { _id, teacherObject } = body
        let result = await Class.findByIdAndUpdate(_id, { teacherObject: teacherObject }, { new: true })
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

module.exports = { deleteManyClassService, getClassByIdService, postStudentForClassService, postSubjectTeacherForClassService, getClassBySeasonService }