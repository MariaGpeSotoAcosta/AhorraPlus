import Form from '../models/form.model.js';

export const saveForm = async (req, res) => {
    try {
        const foundForm = await Form.exists({
            user: req.user.iD,
        });

        if (!foundForm) { // create
            try {
                const { earnings, monthItems, weekItems, savingsPercent } = req.body;

                const newForm = new Form({
                    earnings,
                    monthItems,
                    weekItems,
                    savingsPercent,
                    user: req.user.iD,
                });
                const savedForm = await newForm.save();
                res.json(savedForm);
            } catch (error) {
                return res.status(500).json({ message: 'Something went wrong saving the form' });
            }
        } else { // update
            try {
                const updatedForm = await Form.findOneAndUpdate({
                    user: req.user.iD,
                }, req.body, { new: true, });
                if (!updatedForm) {
                    return res.status(204).json({ message: 'Form not found' });
                }
                res.json(updatedForm);
            } catch (error) {
                return res.status(204).json({ mesagge: 'Form not found' });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const getForm = async (req, res) => {
    try {
        const form = await Form.findOne({
            user: req.user.iD,
        }).populate('user');
        res.json(form);
    } catch (error) {
        return res.status(204).json({ mesagge: 'Form not found' });
    }
};
