const { postSeasonService, getSeasonService, getSeasonByIdService, upsertSeasonService } = require("../services/seasonService");

const getSeason = async (req, res) => {
    let data = await getSeasonService(req.query);
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

const getSeasonById = async (req, res) => {
    let data = await getSeasonByIdService(req.params.id);
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

const postSeason = async (req, res) => {
    let data = await postSeasonService(req.body);
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

const upsertSeason = async (req, res) => {
    let data = await upsertSeasonService(req.body);
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
    postSeason, getSeason, getSeasonById, upsertSeason
}