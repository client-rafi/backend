import Contact from "../models/contact.model.js";

// Controller function to create a new contact
const createNewContact = async (req, res) => {
  try {
    // Extract the data from the request body (assuming you are using a JSON request body)
    const { first_name, last_name, contact_number, email, comment } = req.body;

    // Create a new instance of the Contact model with the extracted data
    const contact = new Contact({
      first_name,
      last_name,
      contact_number,
      email,
      comment,
    });

    // Save the contact data to the database
    const savedContact = await contact.save();

    // Respond with the saved contact data
    res.status(201).json(savedContact);
  } catch (error) {
    // If there's an error, respond with an error message
    console.error("Error saving contact data:", error);
    res.status(500).json({ error: "Error saving contact data" });
  }
};

// Controller function to get the list of all contacts
const getAllContact= async (req, res) => {
  try {
    // Fetch all contacts from the database
    const contacts = await Contact.find();

    // Respond with the list of contacts
    res.status(200).json(contacts);
  } catch (error) {
    // If there's an error, respond with an error message
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Error fetching contacts" });
  }
};


export { createNewContact, getAllContact };
