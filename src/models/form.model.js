import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
});

const formSchema = new mongoose.Schema({
    earnings: {
        type: Number,
        required: true,
    },
    monthItems: {
        type: [itemSchema],
    },
    weekItems: {
        type: [itemSchema],
    },
    savingsPercent: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
});

export default mongoose.model('Form', formSchema);
