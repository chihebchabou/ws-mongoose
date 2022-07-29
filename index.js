const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Connect to database
connectDB();
const date = new Date();

// Schema
const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  birthDate: {
    type: Number,
    default: date.getFullYear(),
  },
});

// Model
const Contact = mongoose.model('contact', contactSchema);

// Create contact (create a document)
const createContact = async () => {
  const contact = new Contact({
    fullName: 'Mounir Doe',
    email: 'x@gmail.com',
    phone: 5555555557,
    birthDate: 2000,
    job: 'web dev',
  });

  try {
    const result = await contact.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};

const getContacts = async () => {
  /*
  Comparison Query Operators
  - eq
  - ne (not equal)
  - gt
  - gte
  - lt
  - lte
  - in 
  - nin (not in)
  */
  try {
    // const contacts = await Contact.find();
    // const contacts = await Contact.find({birthDate: 1960});
    // const contacts = await Contact.find({
    //   birthDate: { $gt: 1960, $lt: 2000 },
    // });
    // const contacts = await Contact.find({ birthDate: { $in: [1990, 1960] } });
    // const contacts = await Contact.find().limit(3).sort('-birthDate'); // DESC
    const contacts = await Contact.find()
      .limit(3)
      .sort({ birthDate: -1 })
      .select({ fullName: 1, email: 1 }); // DESC
    console.log(contacts);
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (id, birthDate) => {
  // Query first
  // try {
  //   const contact = await Contact.findById(id);
  //   contact.birthDate = birthDate;
  //   const result = await contact.save();
  //   console.log(result);
  // } catch (err) {
  //   console.log(err.message);
  // }

  // Update first
  // try {
  //   const result = await Contact.updateOne(
  //     { _id: id },
  //     { $set: { birthDate } }
  //   );
  //   console.log(result);
  // } catch (err) {
  //   console.log(err.message);
  // }

  try {
    const contact = await Contact.findByIdAndUpdate(
      id,
      {
        $set: { birthDate },
      },
      { new: true }
    );

    console.log(contact);
  } catch (error) {
    console.log(err.message);
  }
};

// Delete contact
const removeContact = async id => {
  try {
    const result = await Contact.deleteOne({ _id: id });
    // const contact = await Contact.findByIdAndRemove(id);
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};

// getContacts();
// createContact();
// updateContact('62e2b6aaeb7560e89ff00451');
removeContact('62e2b6aaeb7560e89ff00451');
