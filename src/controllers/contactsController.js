const Contact = require('../models/contact');

const getContacts = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
    });
  }
};
const getContactById = (req, res) => {
  const { id } = req.params;

  const contact = contacts.find((contact) => contact.id === id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
};

module.exports = { getContacts, getContactById };
