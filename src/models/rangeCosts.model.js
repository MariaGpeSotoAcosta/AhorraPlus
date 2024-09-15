import mongoose from 'mongoose';

const rangeCostSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    minValue: {
        type: Number,
        required: true,
    },
    maxValue: {
        type: Number,
        required: true,
    },
    frequency: {
        type: String,
        required: true,
    },
    importance: {
        type: Number,
        required: true,
    }
});

const rangeCostsSchema = mongoose.Schema({
    rangeCosts: {
        type: [rangeCostSchema],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('RangeCosts', rangeCostsSchema);
