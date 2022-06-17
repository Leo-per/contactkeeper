const express = require("express");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

const Contact = require("../models/Contact");

const router = express.Router();

//@route   GET api/contacts
//@desc    GET all user contacts
//@access  Private
router.get("/", auth, async (req, res) => {
  console.log(req.user);
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error contacts");
  }
});

//@route   POST api/contact
//@desc    POST add new contact
//@access  Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    // res.send("Add contact")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //
    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      // saved contact to the DB
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route   PUT api/contacts/:id
//@desc    Update contact
//@access  Private

router.put("/:id", auth, async (req, res) => {
  //   res.send("Update contact");

  const { name, email, phone, type } = req.body;

  //   console.log(name);

  //   res.send("Update contact");

  //Build a conctact object

  const ContactFields = {};

  if (name) ContactFields.name = name;
  if (email) ContactFields.email = email;
  if (phone) ContactFields.phone = phone;
  if (type) ContactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // console.log(contact.user.toString()); it prints an object so needs to be converted to string...

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: ContactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//@route   PUT api/contacts/:id
//@desc    Delete contact
//@access  Private

router.delete("/:id", auth, async (req, res) => {
  // res.send("Delete contact")

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(400).send("Contact not found");
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.send("contact deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
