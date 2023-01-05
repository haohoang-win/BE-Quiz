const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const quizSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        image: String,
        difficulty: String,
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

// Override all methods
quizSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Quiz = mongoose.model('quiz', quizSchema);

module.exports = Quiz;