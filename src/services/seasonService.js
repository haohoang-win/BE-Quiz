const Season = require('../models/season')

const postSeasonService = async (rawData) => {
    try {
        const { year } = rawData;
        let checkExist = await Season.findOne({ year });
        if (checkExist) {
            return ({
                EC: 1,
                DT: [],
                EM: 'This season already exist',
            })
        } else {
            let result = await Season.create({
                year
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

const getSeasonService = async () => {
    try {
        let result = await Season.find().sort({ year: -1 });
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

module.exports = { postSeasonService, getSeasonService, getSeasonByIdService }