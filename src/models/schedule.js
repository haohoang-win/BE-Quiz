const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const timeTableSchema = new mongoose.Schema({
    inDate: String,
    weekDay: String
});

const teacherSchema = new mongoose.Schema({
    username: String,
    email: String,
    object: String
});

const scheduleSchema = new mongoose.Schema(
    {
        inDate: timeTableSchema,
        week: Number,
        season: String,
        time: String,
        student: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
        teacher: teacherSchema,
        content: String,
        reason: String,
        amountStudent: Number,
        forClass: String,
        status: String
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

scheduleSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Schedule = mongoose.model('schedule', scheduleSchema);

module.exports = Schedule;
