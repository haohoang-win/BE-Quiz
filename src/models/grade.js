const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const gradeSchema = new mongoose.Schema(
    {
        grade: String,
        season: String,
        classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'grades' }],
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

gradeSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Grade = mongoose.model('grade', gradeSchema);

module.exports = Grade;