const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/contactify", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection established successfully");
});

const contactsRouter = require("./routes/contacts");
app.use("/contacts",contactsRouter);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});