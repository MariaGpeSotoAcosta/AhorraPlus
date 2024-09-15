import FixedCosts from '../models/fixedCosts.model.js';
import RangeCosts from '../models/rangeCosts.model.js';

export const saveFixedCosts = async (req, res) => {
    try {
        const foundCosts = await FixedCosts.exists({
            user: req.user.iD,
        });

        if (!foundCosts) { // create
            try {
                const { earnings, fixedCosts } = req.body;

                const newFixedCosts = new FixedCosts({
                    earnings,
                    fixedCosts,
                    user: req.user.iD,
                });
                const savedFixedCosts = await newFixedCosts.save();
                res.json(savedFixedCosts);
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: 'Something went wrong saving the fixedCosts' });
            }
        } else { // update
            try {
                const updatedFixedCosts = await FixedCosts.findOneAndUpdate({
                    user: req.user.iD,
                }, req.body, { new: true, });
                if (!updatedFixedCosts) {
                    return res.status(204).json({ message: 'fixedCosts not found' });
                }
                res.json(updatedFixedCosts);
            } catch (error) {
                return res.status(204).json({ mesagge: 'fixedCosts not found' });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const getFixedCosts = async (req, res) => {
    try {
        const fixedCosts = await FixedCosts.findOne({
            user: req.user.iD,
        }).populate('user');
        res.json(fixedCosts);
    } catch (error) {
        return res.status(204).json({ mesagge: 'fixedCosts not found' });
    }
};

export const saveRangeCosts = async (req, res) => {
    try {
        const foundCosts = await RangeCosts.exists({
            user: req.user.iD,
        });

        if (!foundCosts) { // create
            try {
                const { rangeCosts } = req.body;

                const newRangeCosts = new RangeCosts({
                    rangeCosts,
                    user: req.user.iD,
                });
                const savedRangeCosts = await newRangeCosts.save();
                res.json(savedRangeCosts);
            } catch (error) {
                return res.status(500).json({ message: 'Something went wrong saving the rangeCosts' });
            }
        } else { // update
            try {
                const updatedRangeCosts = await RangeCosts.findOneAndUpdate({
                    user: req.user.iD,
                }, req.body, { new: true, });
                if (!updatedRangeCosts) {
                    return res.status(204).json({ message: 'rangeCosts not found' });
                }
                res.json(updatedRangeCosts);
            } catch (error) {
                return res.status(204).json({ mesagge: 'rangeCosts not found' });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const getRangeCosts = async (req, res) => {
    try {
        const rangeCosts = await RangeCosts.findOne({
            user: req.user.iD,
        }).populate('user');
        res.json(rangeCosts);
    } catch (error) {
        return res.status(204).json({ mesagge: 'rangeCosts not found' });
    }
}
