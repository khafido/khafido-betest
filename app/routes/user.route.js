const { withJWTAuthMiddleware } = require("express-kun");

module.exports = app => {
    const users = require("../controllers/user.controller");
    var router = require("express").Router();
    const protectedRouter = withJWTAuthMiddleware(router, process.env.TOKEN_KEY);

    //Create login route
    router.post("/login", users.login);

    // Create a new User
    router.post("/", users.create);

    // Retrieve all Users
    protectedRouter.get("/", users.findAll);

    // Retrieve all Users by Account Number
    protectedRouter.get("/accountNumber/:accountNumber", users.findByAccountNumber);

    // Retrieve all Users by Identity Number
    protectedRouter.get("/identityNumber/:identityNumber", users.findByIdentityNumber);

    // Update a User by Account Number
    protectedRouter.put("/:accountNumber", users.update);

    // Delete a User by Account Number
    protectedRouter.delete("/:accountNumber", users.delete);

    app.use('/api/users', router);
}