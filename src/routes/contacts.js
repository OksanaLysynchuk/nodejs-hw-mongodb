const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactsController');

router.get('/', contactController.getContacts);
router.get('/:contactId', contactController.getContactById);

module.exports = router;
