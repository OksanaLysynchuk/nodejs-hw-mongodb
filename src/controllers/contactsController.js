import Contact from '../db/models/contactModel.js';

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ status: 'success', data: contacts });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    if (contact) {
      res.status(200).json({ status: 'success', data: contact });
    } else {
      res.status(404).json({ status: 'error', message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
