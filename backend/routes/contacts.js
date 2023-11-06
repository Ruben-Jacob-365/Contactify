const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

//GET contacts
router.get("/",async (req,res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    }
    catch (error) {
        console.error("Error fetching contacts",error);
        res.status(500).json({ error: "Error fetching contacts" });
    }
});

//POST a contact
router.post("/",async (req,res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.json(newContact);
    }
    catch (error) {
        console.error("Error adding contacts: ", error);
        res.status(500).json({error: "Error adding contacts"});
    }
});

//PUT-edit contact
router.put("/:id",async (req,res) =>{

    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.json(updatedContact);
    }
    catch(error) {
        console.error("Error updating contact: ",error);
        res.status(500).json({error: "Error updating contact" });
    }
});

//DELETE contact
router.delete("/:id",async(req,res) => {
    try {
        await Contact.findByIdAndRemove(req.params.id);
        res.json({message: "Contact deleted successfully"});
    }
    catch(error) {
        console.error("Error deleting contact: ",error);
        res.status(500).json({error: "Error deleting contact "});
    }
});

module.exports = router;

