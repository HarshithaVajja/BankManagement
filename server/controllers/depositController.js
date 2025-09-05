import { Deposits, Transactions, User } from '../models/schemas.js';

export const fetchDeposits = async (req, res) => {
    try {
        const deposits = await Deposits.find();
        res.json(deposits);
    } catch (err) {
        res.status(500).json({ message: "Error occured" });
    }
};

export const newDeposit = async (req, res) => {
    const { depositName, customerId, customerName, nomineeName, nomineeAge, duration, amount, createdDate } = req.body;
    try {
        const date = new Date(createdDate);
        const matureDate = date.getDate() + '-' + (date.getMonth() % 12) + '-' + (date.getFullYear() + Math.floor(duration / 12));
        const user = await User.findOne({ _id: customerId });
        const newDeposit = new Deposits({
            depositName, customerId, customerName, nomineeName, nomineeAge, duration, amount, createdDate, matureDate
        });

        const transaction = new Transactions({
            senderId: customerId, senderName: customerName, deposit: depositName, amount, time: new Date(), remarks: "Deposit payment"
        });
        await transaction.save();

        await newDeposit.save();
        user.balance = parseFloat(user.balance) + parseFloat(amount);
        await user.save();
        res.json({ message: "deposit created" });
    } catch (err) {
        res.status(500).json({ message: "Error occured" });
    }
};
