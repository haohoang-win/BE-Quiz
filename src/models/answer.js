const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const answerSchema = new mongoose.Schema(
    {
        description: String,
        isCorrect: Boolean
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

// Override all methods
answerSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Answer = mongoose.model('answer', answerSchema);

module.exports = Answer;
