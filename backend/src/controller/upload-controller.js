const uploadServices = require('../services/upload-services.js');
const { getDocument, updateSummary, downloadSummary } = require('../services/upload-services.js');
const mongoose = require('mongoose');

const uploadFile = async (req, res) => {
    console.log("Received User ID:", req.user.id); // Debugging
    console.log("Received File:", req.file); // Debugging
    const file_path = req.file.path;
    if (!req.file) {
        return res.status(400).json({
            error: 'Invalid file type. Upload a valid document or image.'
        });
    } 

    // const isValidObjectId = mongoose.Types.ObjectId.isValid(req.body.userid);
    // if (!isValidObjectId) {
    //     return res.status(400).json({ error: "Invalid user ID format." });
    // }

    try {
        const fileMimeType = req.file.mimetype;
        const allowedTypes = {
            "application/pdf": "pdf",
            "image/jpeg": "jpeg",
            "image/png": "png"
        };
        const fileData = {
            user_id: req.user.id,
            file_name: req.file.originalname,
            file_url: `/uploads/${req.file.filename}`,
            file_type: req.file.mimetype,
            status: req.body.status || "pending",
            risk_score: req.body.risk_score || 0,
            summary: req.body.summary || ""
        };
        const result = await uploadServices.saveFile(fileData,file_path);
        console.log("data got",result);
        
        res.status(201).json({
            data: result,
            success: true,
            err: {},
            message: 'successfully uploaded file'
        });
    } catch (error) {
        res.status(500).json({
            data: {},
            success: false,
            err: error,
            message: 'Unable to upload the file'
        });
    }
};

const fetchDocument = async (req, res) => {
    try {
        const response = await getDocument(req.query.userid);
        console.log("1::", req.query.userid);
        console.log("2::", response);
        return res.status(201).json({
            data: response,
            success: true,
            message: "successfully fetched content",
            err: {}
        });
    } catch (error) {
        res.status(500).json({
            data: {},
            success: false,
            err: error,
            message: 'Unable to fetch the files'
        });
    }
};

const updateDocumentSummary = async (req, res) => {
    try {
        const { documentId, summary } = req.body;
        const updatedDocument = await updateSummary(documentId, summary);
        res.status(200).json({
            data: updatedDocument,
            success: true,
            message: "Summary updated successfully",
            err: {}
        });
    } catch (error) {
        res.status(500).json({
            data: {},
            success: false,
            err: error,
            message: 'Unable to update the summary'
        });
    }
};

const downloadDocumentSummary = async(req,res)=>{
    try {
        const documentId  = req.body.document_Id;
        if (!documentId) {
            return res.status(400).json({
                message: "documentId is required"
            });
        }

        await downloadSummary(documentId, res);
    } catch (error) {
        res.status(500).json({
            data: {},
            success: false,
            err: error,
            message: 'Unable to download the summary'
        });
    }
}

module.exports = {
    uploadFile,
    fetchDocument,
    updateDocumentSummary,
    downloadDocumentSummary
};
