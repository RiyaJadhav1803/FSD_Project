const express = require('express');
const upload = require('../../middleware/upload-middleware.js');
const { uploadFile, fetchDocument, updateDocumentSummary, downloadDocumentSummary } = require('../../controller/upload-controller.js');
const { signup, login } = require('../../controller/user-controller.js');
const authenticateUser = require('../../middleware/user-middleware.js');
const Document = require('../../models/Documents.js');

const router = express.Router();
const fs = require('fs');

router.post('/upload',authenticateUser,upload.single('file'), uploadFile);
router.get('/documents', authenticateUser, fetchDocument);
router.post('/update-summary', authenticateUser, updateDocumentSummary);
router.get('/download',downloadDocumentSummary);

router.post('/signup', signup);
router.post('/login', login);

router.get('/summaries', authenticateUser, async (req, res) => {
    try {
        const id = req.user.id;  // Get the user ID from the authenticated user
        console.log('Fetching documents for:', id);  // Debugging log

        const documents = await Document.find({ user_id: id });
        console.log(documents);
        

        if (!documents || documents.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: "No documents found for the logged-in user." 
            });
        }

        console.log("These are the documents:", documents);

        res.json({ 
            success: true, 
            documents 
        });
    } catch (error) {
        console.error('Error fetching documents:', error.message);
        res.status(500).json({ 
            success: false, 
            message: "Error retrieving documents." 
        });
    }
});
module.exports = router;
