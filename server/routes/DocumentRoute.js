const express = require('express');
const { uploadDoc } = require('../controllers/Document');
const { upload } = require('../config/upload');
const router = express.Router();

router.post('/uploadpdf/:id',upload.single('file'),uploadDoc);

module.exports = router;