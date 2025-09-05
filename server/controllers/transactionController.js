import { Transactions, User } from '../models/schemas.js';

export const sendMoney = async (req, res) => {
    const { senderId, senderName, remarks, receiverId, receiverIFSC, amount, paymentMethod, time } = req.body;
    try {
        const sender = await User.findOne({ _id: senderId });
        const receiver = await User.findOne({ _id: receiverId });
        if (!receiver) {
            return res.status(404).json({ message: 'Receiver not exists' });
        }
        if (receiver.ifsc !== receiverIFSC) {
            return res.status(500).json({ message: 'Transaction failed' });
        }
        const receiverName = receiver.username;

        const transaction = new Transactions({
            senderId,
            senderName,
            receiverId,
            receiverIFSC,
            receiverName,
            amount,
            remarks,
            paymentMethod,
            time
        });

        await transaction.save();

        sender.balance = parseFloat(sender.balance) - parseFloat(amount);
        receiver.balance = parseFloat(receiver.balance) + parseFloat(amount);

        await sender.save();
        await receiver.save();

        res.json({ message: 'Transaction successful' });
    } catch (err) {
        console.error("Send Money Error:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const fetchTransactions = async (req, res) => {
    try {
        const transactions = await Transactions.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: "Error occured" });
    }
};
