const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const scheduleSchema = new mongoose.Schema(
    {
        weekNumber: String,
        season: String,
        day: String,
        time: String,
        class: String,
        teacher: String,
        status: Boolean
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

scheduleSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Schedule = mongoose.model('schedule', scheduleSchema);

module.exports = Schedule;
