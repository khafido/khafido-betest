const db = require("../models");
const User = db.users;
const redis = require('redis');
const jwt = require("jsonwebtoken");
const service = require('../services/user');

let client;

(async () => {
    client = redis.createClient();

    client.on("error", (error) => console.error(`${error}`));

    await client.connect();
})();

//create login jwt
exports.login = (req, res) => {
    const { accountNumber, identityNumber } = req.body;

    service.findByAccountNumberAndIdentityNumber(accountNumber, identityNumber)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with account number " + accountNumber + " and identity number " + identityNumber
                });
            }
            const id = user._id;
            const token = jwt.sign({ accountNumber, identityNumber, id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.status(200).json({ token });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            });
        });
}

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const user = new User({
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber
    });

    service.create(user).then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

exports.findAll = (req, res) => {
    service.findAll()
        .then(data => {
            client.set('users', JSON.stringify(data), 'EX', 60);
            res.status(200).send({ data: data });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.findByAccountNumber = (req, res) => {
    const reply = client.get('users');

    const accountNumber = req.params.accountNumber;
    reply.then(data => {
        let users = data ? JSON.parse(data) : [];
        const userByAccountNumber = users ? users.find(user => user.accountNumber === req.params.accountNumber) : false;

        if (userByAccountNumber && process.env.NODE_ENV === 'development') {
            res.status(200).send({ isCached: true, data: userByAccountNumber });
        } else {
            service.findByAccountNumber(accountNumber)
                .then(result => {
                    if (result) {
                        if (process.env.NODE_ENV === 'development') {
                            users ? users.push(result) : users = [result];
                            client.set('users', JSON.stringify(users), 'EX', 60);
                        }
                        res.status(200).send({ isCached: false, data: result });
                    } else {
                        res.status(404).send({
                            message: `User was not found!`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving users."
                    });
                });
        }
    });
};

exports.findByIdentityNumber = (req, res) => {
    const reply = client.get('users');

    const identityNumber = req.params.identityNumber;
    reply.then(data => {
        let users = data ? JSON.parse(data) : [];
        const userByIdentityNumber = users ? users.find(user => user.identityNumber === req.params.identityNumber) : false;

        if (userByIdentityNumber && process.env.NODE_ENV === 'development') {
            res.status(200).send({ isCached: true, data: JSON.parse(data) });
        } else {
            service.findByIdentityNumber(identityNumber)
                .then(result => {
                    if (result) {
                        if (process.env.NODE_ENV === 'development') {
                            users ? users.push(result) : users = [result];
                            client.set('users', JSON.stringify(users), 'EX', 60);
                        }
                        res.status(200).send({ isCached: false, data: result });
                    } else {
                        res.status(404).send({
                            message: `User was not found!`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving users."
                    });
                });
        }
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const accountNumber = req.params.accountNumber;

    service.update(accountNumber, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `User was not found!`
                });
            } else res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with accountNumber=" + accountNumber
            });
        });
};

exports.delete = (req, res) => {
    const accountNumber = req.params.accountNumber;
    
    service.delete(accountNumber)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `User was not found!`
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with accountNumber=" + accountNumber
            });
        });
};