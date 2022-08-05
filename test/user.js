const { expect } = require("chai");
const users = require("../app/controllers/user.controller");
let db = require("../app/models");
const User = db.users;
const service = require("../app/services/user");

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

            const result = service.create(user);
            result.then(data => {
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

    describe("Login", () => {
        it("should return a exist user", () => {
            const user = {
                accountNumber: "123456789",
                identityNumber: "987654321",
            };
            return service.findByAccountNumberAndIdentityNumber(user.accountNumber, user.identityNumber)
                .then(data => {
                    expect(data.accountNumber).to.equal("123456789");
                    expect(data.identityNumber).to.equal("987654321");
                }).catch(err => {
                    console.log(err);
                }
                );
        }
        );
    });

    describe("Find All", () => {
        it("Should find all users", () => {
            const result = service.findAll();
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

            const result = service.findByAccountNumber(accountNumber);
            result.then(data => {
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

            const result = service.findByIdentityNumber(identityNumber);
            result.then(data => {
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

            const result = service.update(accountNumber, { userName: userName });
            result.then(data => {
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

            const result = service.delete(accountNumber);
            result.then(data => {
                expect(data).to.be.an("object");
                expect(data).to.have.property("userName");
                expect(data).to.have.property("accountNumber");
                expect(data).to.have.property("emailAddress");
                expect(data).to.have.property("identityNumber");
            }).catch(err => {
                console.log("err: ", err);
            })
        }).timeout(5000);
    }).timeout(5000);

}).timeout(5000);