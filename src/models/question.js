const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const questionSchema = new mongoose.Schema(
    {
        description: String,
        image: String,
        imageB64: String,
        difficulty: String,
        answerDescription: [{ type: String, required: false }],
        answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'answer' }],
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

// Override all methods
questionSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Question = mongoose.model('question', questionSchema);

module.exports = Question;
