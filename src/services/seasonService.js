const Season = require('../models/season')
const Class = require('../models/class')
const Grade = require('../models/grade')
const aqp = require('api-query-params');

const postSeasonService = async (rawData) => {
    try {
        const { year, dayOfStart } = rawData;
        let checkExist = await Season.findOne({ year });
        if (checkExist) {
            return ({
                EC: 1,
                DT: [],
                EM: 'This season already exist',
            })
        } else {
            let result = await Season.create({
                year,
                dayOfStart
            });
            return ({
                EC: 0,
                DT: result,
                EM: 'Create a season',
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

const getSeasonService = async (queryString) => {
    try {
        const { population, year } = aqp(queryString);
        let result = null;
        if (year) {
            result = await Season.findOne({ year }).exec();
        } else {
            result = await Season.find().populate(population).exec();
        }
        return ({
            EC: 0,
            DT: result,
            EM: 'Get all season',
        })
    } catch (error) {
        return {
            EM: 'Something wrong with service',
            EC: 1,
            DT: []
        }
    }
}

const getSeasonByIdService = async (id) => {
    try {
        let result = await Season.findById(id);
        if (result) {
            return ({
                EC: 0,
                DT: result,
                EM: 'Get all season',
            })
        } else {
            return ({
                EC: 1,
                DT: [],
                EM: 'Dont have this season',
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

const upsertSeasonService = async (rawData) => {
    try {
        let mySeason = await Season.findById(rawData._id).exec();
        if (mySeason && rawData.grades && rawData.grades.length > 0) {
            let newBulkClass = []
            let newBulkGrade = []
            let existBulkClass10 = []
            let existBulkClass11 = []
            let existBulkClass12 = []
            let existBulkTeacherClass10 = []
            let existBulkTeacherClass11 = []
            let existBulkTeacherClass12 = []
            let existBulkGrade = []
            rawData.grades.map((grade, index) => {
                if (grade.classes && grade.classes.length > 0) {
                    grade.classes.map((classInfo, number) => {
                        if (classInfo._id && classInfo._id.slice(0, 6) === 'fakeId') {
                            delete classInfo._id;
                            newBulkClass.push(classInfo);
                        } else {
                            if (index === 0) {
                                existBulkClass10.push(classInfo._id)
                                existBulkTeacherClass10.push(classInfo.teacher[0])
                            } else if (index === 1) {
                                existBulkClass11.push(classInfo._id)
                                existBulkTeacherClass11.push(classInfo.teacher[0])
                            } else {
                                existBulkClass12.push(classInfo._id)
                                existBulkTeacherClass12.push(classInfo.teacher[0])
                            }
                        }
                    })
                }
                if (grade._id && grade._id.slice(0, 6) === 'fakeId') {
                    delete grade._id;
                    newBulkGrade.push(grade)
                } else {
                    existBulkGrade.push(grade._id)
                }
            })
            let bulkClass10 = []
            let bulkClass11 = []
            let bulkClass12 = []
            if (newBulkClass.length > 0) {
                let res = await Class.insertMany(newBulkClass);
                if (res && newBulkGrade.length > 0) {
                    res.map((nameClass) => {
                        if (nameClass.name.slice(0, 2) === '10') {
                            bulkClass10.push(nameClass._id)
                            if (newBulkGrade && newBulkGrade[0]) {
                                newBulkGrade[0].classes = bulkClass10
                            }
                        } else if (nameClass.name.slice(0, 2) === '11') {
                            bulkClass11.push(nameClass._id)
                            if (newBulkGrade && newBulkGrade[1]) {
                                newBulkGrade[1].classes = bulkClass11
                            }
                        } else {
                            bulkClass12.push(nameClass._id)
                            if (newBulkGrade && newBulkGrade[2]) {
                                newBulkGrade[2].classes = bulkClass12
                            }
                        }
                    });
                    let newGrade = await Grade.insertMany(newBulkGrade);
                    if (newGrade) {
                        newGrade.forEach(grade => {
                            mySeason.grades.push(grade._id)
                        })
                        await mySeason.save()
                    }
                } else {
                    res.map((nameClass) => {
                        if (nameClass.name.slice(0, 2) === '10') {
                            bulkClass10.push(nameClass._id)
                        } else if (nameClass.name.slice(0, 2) === '11') {
                            bulkClass11.push(nameClass._id)
                        } else {
                            bulkClass12.push(nameClass._id)
                        }
                    });
                }
            }
            if ((newBulkClass.length > 0 || existBulkClass10.length > 0 || existBulkClass11.length > 0 || existBulkClass12.length > 0) && existBulkGrade.length > 0) {
                existBulkGrade.forEach(async (idGrade, index) => {
                    let gradeExist = await Grade.findOne({ _id: idGrade })
                    gradeExist.classes = null;
                    if (index === 0) {
                        gradeExist.classes = [...existBulkClass10, ...bulkClass10]
                    } else if (index === 1) {
                        gradeExist.classes = [...existBulkClass11, ...bulkClass11]
                    } else {
                        gradeExist.classes = [...existBulkClass12, ...bulkClass12]
                    }
                    await gradeExist.save()
                })
            }
            if (existBulkClass10.length > 0 && existBulkTeacherClass10.length > 0) {
                existBulkClass10.forEach(async (idClass, index) => {
                    await Class.findOneAndUpdate({ _id: idClass }, { teacher: existBulkTeacherClass10[index] }, { new: true })
                })
            }
            if (existBulkClass11.length > 0 && existBulkTeacherClass11.length > 0) {
                existBulkClass11.forEach(async (idClass, index) => {
                    await Class.findOneAndUpdate({ _id: idClass }, { teacher: existBulkTeacherClass11[index] }, { new: true })
                })
            }
            if (existBulkClass12.length > 0 && existBulkTeacherClass12.length > 0) {
                existBulkClass12.forEach(async (idClass, index) => {
                    await Class.findOneAndUpdate({ _id: idClass }, { teacher: existBulkTeacherClass12[index] }, { new: true })
                })
            }
        } else {
            return ({
                EC: 1,
                DT: [],
                EM: 'Not found season',
            })
        }
        return ({
            EC: 0,
            DT: mySeason,
            EM: 'upsert season success',
        })
    } catch (error) {
        return {
            EM: 'Something wrong with service',
            EC: 1,
            DT: []
        }
    }
}

module.exports = { postSeasonService, getSeasonService, getSeasonByIdService, upsertSeasonService }