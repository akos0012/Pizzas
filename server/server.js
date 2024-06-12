require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const { MONGO_URL, PORT } = process.env;
const cors = require("cors");

if (!MONGO_URL) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
}

const app = express();
app.use(express.json({ limit: "25mb" }));

const allowedOrigins = [
    "https://pizzas-n8cl.onrender.com"
];

app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use('/api', routes);

const main = async () => {
    await mongoose.connect(MONGO_URL);

    app.listen(PORT, () => {
        console.log("App is listening on " + PORT);
    });
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});