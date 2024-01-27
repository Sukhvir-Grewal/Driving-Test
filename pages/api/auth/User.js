const mongoose = require("mongoose");

// Check if the model already exists
const User = mongoose.models.User
    ? mongoose.model("User")
    : mongoose.model(
          "User",
          new mongoose.Schema({
              username: {
                  type: String,
                  unique: true,
              },
              password: String,
              profileImage: {
                publicID: String,
                imageUrl: String 
              }
          })
      );

module.exports = User;
