const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const answerForUserSchema = new mongoose.Schema(
    {
        description: String,
        isSelected: Boolean
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

// Override all methods
answerForUserSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const AnswerForUser = mongoose.model('answerForUser', answerForUserSchema);

module.exports = AnswerForUser;
