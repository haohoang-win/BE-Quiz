const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const userSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        image: String,
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

// Override all methods
userSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const User = mongoose.model('user', userSchema);

module.exports = User;
