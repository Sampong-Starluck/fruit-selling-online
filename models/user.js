const mongoose = require("mongoose");
const schema = mongoose.Schema;

const user = new schema({
    name: {
        type: String,
        require: true
    },
    product: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    quantity: {
        type: String,
        require: true
    }

}, { collection: "user" });

module.exports = mongoose.model("user", user);