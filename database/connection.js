const mongoose = require("mongoose");
const express = require("express");

const app = express();

const connectDb = (url, port) => {
    mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(port, () =>
            console.log(`Server is running at : http://localhost:${port}`)
        )
    )
    .catch((error) => console.error(error));
}

module.exports = connectDb;