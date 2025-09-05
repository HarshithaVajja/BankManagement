import bcrypt from 'bcrypt';
import { Bank, User } from '../models/schemas.js';

export const register = async (req, res) => {
    const { username, email, usertype, password, homeBranch } = req.body;
    try {
        if (usertype === 'customer') {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const IFSC = {
                'hyderabad': 'SB007HYD25',
                'bangalore': 'SB007BLR30',
                'chennai': 'SB007CNI99',
                'mumbai': 'SB007MBI12',
                'tirupati': 'SB007TPTY05',
                'vizag': 'SB007VZG229',
                'pune': 'SB007PN77',
                'delhi': 'SB007DLI09',
                'kochi': 'SB007KCI540',
                'Venkatagiri': 'SB007VGR313',
            };
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                email,
                usertype,
                homeBranch,
                ifsc: IFSC[homeBranch],
                password: hashedPassword
            });
            const userCreated = await newUser.save();
            return res.status(201).json(userCreated);
        } else if (usertype === 'admin') {
            const existingUser = await Bank.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new Bank({ username, email, usertype, password: hashedPassword });
            const userCreated = await newUser.save();
            return res.status(201).json(userCreated);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

export const login = async (req, res) => {
    const { email, usertype, password } = req.body;
    try {
        if (usertype === 'customer') {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            } else {
                return res.json(user);
            }
        } else if (usertype === 'admin') {
            const user = await Bank.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            } else {
                return res.json(user);
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
