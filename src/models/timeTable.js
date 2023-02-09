const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const timeTableSchema = new mongoose.Schema(
    {
        inDate: String,
        weekDay: String,
        schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'schedule' }],
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

timeTableSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const TimeTable = mongoose.model('timetable', timeTableSchema);

module.exports = TimeTable;
