const Document = require('../models/Documents.js');

class UploadRepository {
    async storeFile(data) {
        try {
            console.log("Repository Layer: Storing File", data);
            const document = await Document.create(data);
            console.log("Repository Layer: File Saved", document);
            return document;
        } catch (error) {
            console.error("Repository Layer Error: Failed to store file", error);
            throw error;
        }
    }

    async getDocumentByUserId(userId) {
        try {
            console.log(`Repository Layer: Fetching Documents for User ID: ${userId}`);
            const documents = await Document.find({ user_id: userId });
            return documents;
        } catch (error) {
            console.error("Repository Layer Error: Failed to fetch documents", error);
            throw error;
        }
    }

    async saveSummary(documentId, docSummary){
        try {
            const response = await Document.findById(documentId);
            response.summary = docSummary;
            await response.save();
            return response;
        } catch (error) {
            console.error("Repository Layer Error: Failed to fetch documents", error);
            throw error;
        }
    }
}

module.exports = UploadRepository;
