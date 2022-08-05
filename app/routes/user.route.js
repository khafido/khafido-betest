module.exports = app => {
    const users = require("../controllers/user.controller");
    var router = require("express").Router();

    // Create a new User
    router.post("/", users.create);

    // Retrieve all Users
    router.get("/", users.findAll);

    // Retrieve all Users by Account Number
    router.get("/accountNumber/:accountNumber", users.findByAccountNumber);

    // Retrieve all Users by Identity Number
    router.get("/identityNumber/:identityNumber", users.findByIdentityNumber);

    // Update a User with :accountNumber
    router.put("/:accountNumber", users.update);

    // Delete a User with :accountNumber
    router.delete("/:accountNumber", users.delete);

    app.use('/api/users', router);
}