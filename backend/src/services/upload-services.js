const uploadRepository = require('../repository/upload-repository.js');
const uploadRepo = new uploadRepository();

const saveFile = async (fileData) => {
    try {
        console.log("Service Layer Called", fileData);
        const response = await uploadRepo.storeFile(fileData);
        return response;
    } catch (error) {
        console.log("Service layer error", error);
        throw new Error('Error saving file to database.');
    }
};

const getDocument = async (userid) => {
    try {
        const documents = await uploadRepo.getDocumentByUserId(userid);
        return documents;
    } catch (error) {
        console.log("Service layer error", error);
        throw error;
    }
};

const updateSummary = async (documentId, summary) => {
    try {
        const updatedDocument = await uploadRepo.updateDocumentSummary(documentId, summary);
        return updatedDocument;
    } catch (error) {
        console.log("Service layer error", error);
        throw error;
    }
};

module.exports = {
    saveFile,
    getDocument,
    updateSummary
};
