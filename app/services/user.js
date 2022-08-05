const db = require("../models");
const User = db.users;

exports.create = async (user) => {
    return await user.save(user);
}

exports.findAll = async () => {
    return await User.find();
}

exports.findByAccountNumber = async (accountNumber) => {
    return await User.findOne({ accountNumber: accountNumber });
}

exports.findByIdentityNumber = async (identityNumber) => {
    return await User.findOne({ identityNumber: identityNumber });
}

exports.findByAccountNumberAndIdentityNumber = async (accountNumber, identityNumber) => {
    return await User.findOne({ accountNumber: accountNumber, identityNumber: identityNumber });
}

exports.update = async (accountNumber, req) => {
    return await User.findOneAndUpdate({ accountNumber: accountNumber }, { $set: req }, { new: true });
}

exports.delete = async (accountNumber) => {
    return await User.findOneAndDelete({ accountNumber: accountNumber });
}