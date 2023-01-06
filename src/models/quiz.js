const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const quizSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        difficulty: String,
        image: String,
        imageB64: String,
        questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'question' }],
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

// Override all methods
quizSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Quiz = mongoose.model('quiz', quizSchema);

module.exports = Quiz;
