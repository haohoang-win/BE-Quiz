const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const seasonSchema = new mongoose.Schema(
    {
        year: String,
        dayOfStart: String,
        grades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'grade' }],
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

seasonSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Season = mongoose.model('season', seasonSchema);

module.exports = Season;
