const { postClassOfTeacherService } = require("../services/TimeTableService");

const postClassOfTeacher = async (req, res) => {
    let data = await postClassOfTeacherService(req.body);
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
    postClassOfTeacher
}