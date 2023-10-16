const mongoose = require("mongoose");

const mongodbUrl = "mongodb+srv://zamanabdi24:abdizaman14@cluster0.0kf699j.mongodb.net/?retryWrites=true&w=majority";

const connectDb = () => {
    return mongoose.connect(mongodbUrl);
}

module.exports = {connectDb}