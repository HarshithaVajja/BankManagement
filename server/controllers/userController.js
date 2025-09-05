import { User } from '../models/schemas.js';

export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

export const fetchUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'error occured' });
    }
};
