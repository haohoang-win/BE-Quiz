const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        email: String,
        image: String,
        imageB64: String,
        role: String,
        quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'quiz' }],
        authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'quiz' }]
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

// Override all methods
userSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const User = mongoose.model('user', userSchema);

module.exports = User;
