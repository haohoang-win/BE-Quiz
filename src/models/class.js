const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const classSchema = new mongoose.Schema(
    {
        name: String,
        student: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
        teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
        schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'schedule' }]
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

classSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Class = mongoose.model('class', classSchema);

module.exports = Class;
