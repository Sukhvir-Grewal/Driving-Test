const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://sukhvir:sukhvir1313@cluster0.tinyymv.mongodb.net/?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("mongo Connected");
    } catch (error) {
        console.log("Error while Connecting mongo", error);
    }
};

module.exports = connectDB;
