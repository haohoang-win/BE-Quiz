const { deleteManyClassService, getClassByIdService, postStudentForClassService, postSubjectTeacherForClassService } = require("../services/classService");

const getClassById = async (req, res) => {
    let id = req.params.id
    let data = await getClassByIdService(id, req.query);
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

const deleteManyClass = async (req, res) => {
    let data = await deleteManyClassService(req.body.arrId);
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

const postStudentForClass = async (req, res) => {
    let data = await postStudentForClassService(req.body);
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

const postSubjectTeacherForClass = async (req, res) => {
    let data = await postSubjectTeacherForClassService(req.body);
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
    deleteManyClass, getClassById, postStudentForClass, postSubjectTeacherForClass
}