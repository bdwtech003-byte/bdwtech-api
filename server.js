const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/bdwtech")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));
const ContactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    company: String,
    budget: String,
    details: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model("Contact", ContactSchema, "contacts");

app.post("/contact", async (req, res) => {
    try {
        console.log("Received Data:", req.body);

        const contact = new Contact(req.body);
        await contact.save();

        console.log("Saved Successfully..", contact);

        res.json({
            success: true
        });

    } catch (err) {
        console.error("Save Error:", err);

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});
app.get("/", (req, res) => {
    res.send("Backend is working");
});
app.listen(5000, () => {
    console.log("Server Running on 5000");
});
