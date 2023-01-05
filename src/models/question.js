const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const questionSchema = new mongoose.Schema(
    {
        description: String,
        image: String,
        difficulty: String,
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

// Override all methods
questionSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Question = mongoose.model('question', questionSchema);

module.exports = Question;
