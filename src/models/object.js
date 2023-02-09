const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const objectSchedule = new mongoose.Schema(
    {
        name: String,
        amountLesson: Number,
        teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
        classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'class' }]
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

objectSchedule.plugin(mongoose_delete, { overrideMethods: 'all' });

const Object = mongoose.model('object', objectSchedule);

module.exports = Object;
