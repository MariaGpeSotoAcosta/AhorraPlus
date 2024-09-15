import mongoose from 'mongoose';

const fixedCostSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    frequency: {
        type: String,
        required: true,
    },
});

const fixedCostsSchema = mongoose.Schema({
    earnings: {
        type: Number,
        required: true,
    },
    fixedCosts: {
        type: [fixedCostSchema],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('FixedCosts', fixedCostsSchema);
