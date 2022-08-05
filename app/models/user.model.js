var uniqueValidator = require('mongoose-unique-validator');

module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          userName: {
            type: String,
            required: true,
            unique: true
          },
          accountNumber: {
            type: String,
            required: true,
            unique: true
          },
          emailAddress: {
            type: String,
            required: true,
            unique: true
          },
          identityNumber: {
            type: String,
            required: true,
            unique: true
          },
        },
        { timestamps: true }
      )
    );
    
    return User;
};