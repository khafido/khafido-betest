const { expect } = require("chai");
const users = require("../app/controllers/user.controller");
let db = require("../app/models");
const User = db.users;

db.mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

describe("User", () => {
    describe("Create", () => {
        it("Should create a new user", () => {
            const accountNumber = "123456789";
            const userName = "John Test";
            const emailAddress = "johntest@gmail.com";
            const identityNumber = "987654321";

            const user = new User({
                userName: userName,
                accountNumber: accountNumber,
                emailAddress: emailAddress,
                identityNumber: identityNumber,
            });

            const result = user.save();
            result.then(data => {
                expect(data).to.be.an("object");
                expect(data).to.have.property("userName");
                expect(data).to.have.property("accountNumber");
                expect(data).to.have.property("emailAddress");
                expect(data).to.have.property("identityNumber");

                expect(data.userName).to.equal(userName);
                expect(data.accountNumber).to.equal(accountNumber);
                expect(data.emailAddress).to.equal(emailAddress);
                expect(data.identityNumber).to.equal(identityNumber);
            }).catch(err => {
                console.log("err: ", err);
            })
        }).timeout(5000);
    }).timeout(5000);

    describe("Find All", () => {
        it("Should find all users", () => {
            const result = User.find();
            result.then(data => {
                expect(data).to.be.an("array");
            }).catch(err => {
                console.log("err: ", err);
            })
        }).timeout(5000);
    }).timeout(5000);

    describe("Find by Account Number", () => {
        it("Should find user by account number", () => {
            const accountNumber = "123456789";
            const userName = "John Test";
            const emailAddress = "johntest@gmail.com";
            const identityNumber = "987654321";

            const result = User.findOne({ accountNumber: accountNumber });
            result.then(data => {
                expect(data).to.be.an("object");
                expect(data).to.have.property("userName");
                expect(data).to.have.property("accountNumber");
                expect(data).to.have.property("emailAddress");
                expect(data).to.have.property("identityNumber");

                expect(data.userName).to.equal(userName);
                expect(data.accountNumber).to.equal(accountNumber);
                expect(data.emailAddress).to.equal(emailAddress);
                expect(data.identityNumber).to.equal(identityNumber);
            }).catch(err => {
                console.log("err: ", err);
            })
        }).timeout(5000);
    }).timeout(5000);

    describe("Find by Identity Number", () => {
        it("Should find user by identity number", () => {
            const accountNumber = "123456789";
            const userName = "John Test";
            const emailAddress = "johntest@gmail.com";
            const identityNumber = "987654321";

            const result = User.findOne({ identityNumber: identityNumber });
            result.then(data => {
                expect(data).to.be.an("object");
                expect(data).to.have.property("userName");
                expect(data).to.have.property("accountNumber");
                expect(data).to.have.property("emailAddress");
                expect(data).to.have.property("identityNumber");

                expect(data.userName).to.equal(userName);
                expect(data.accountNumber).to.equal(accountNumber);
                expect(data.emailAddress).to.equal(emailAddress);
                expect(data.identityNumber).to.equal(identityNumber);
            }).catch(err => {
                console.log("err: ", err);
            })
        }).timeout(5000);
    }).timeout(5000);

    describe("Update", () => {
        it("Should update user", () => {
            const accountNumber = "123456789";
            const userName = "John Updated";

            const result = User.findOneAndUpdate({ accountNumber: accountNumber }, { userName: userName }, { new: true });
            result.then(data => {
                expect(data).to.be.an("object");
                expect(data).to.have.property("userName");
                expect(data.userName).to.equal(userName);
            })
            .catch(err => {
                console.log("err: ", err);
            })
        }).timeout(5000);
    }).timeout(5000);

    describe("Delete", () => {
        it("Should delete user", () => {
            const accountNumber = "123456789";
            const userName = "John Updated";
            const emailAddress = "johntest@gmail.com";
            const identityNumber = "987654321";

            const result = User.findOneAndDelete({ accountNumber: accountNumber });
            result.then(data => {
                expect(data).to.be.an("object");
                expect(data).to.have.property("userName");
                expect(data).to.have.property("accountNumber");
                expect(data).to.have.property("emailAddress");
                expect(data).to.have.property("identityNumber");

                expect(data.userName).to.equal(userName);
                expect(data.accountNumber).to.equal(accountNumber);
                expect(data.emailAddress).to.equal(emailAddress);
                expect(data.identityNumber).to.equal(identityNumber);
            }).catch(err => {
                console.log("err: ", err);
            })
        }).timeout(5000);
    }).timeout(5000);

}).timeout(5000);