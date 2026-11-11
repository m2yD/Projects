const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: [true, 'Task description required'],
            trim: true,
        },
        status: {
            type: String,
            enum: ['working', 'pending', 'completed'],
            default: 'working',
        },
    },
    {timestamps: true}
);
module.exports = mongoose.model('Task', taskSchema);