const Tesseract = require("tesseract.js");
const path = require("path");
const fs = require("fs-extra");
const { exec } = require("child_process");

const uploadRepository = require('../repository/upload-repository.js');
const uploadRepo = new uploadRepository();

// const data_summarizer = async (file_data)=>{
//     try{

//     }catch(error){
//         console.log("Error summarizing data", error);
//         return error;
//     }
// }

const extractText = async (file_url,  file_type)=>{
    if(file_type === 'image/jpeg' ||file_type === 'image/png' ){
        try {
            const { data: { text } } = await Tesseract.recognize(file_url, "eng");
            console.log("Text extracted from image", text);
            return text;
        } catch (error) {
            console.log("Error extracting text from image", error);
            return error;
        }
    }else if(file_type === 'application/pdf'){

    }

}

const saveFile = async (fileData, file_path ) => {
    try {
        console.log("Service Layer Called 1", fileData);
        const response = await uploadRepo.storeFile(fileData);
        console.log("From upload service88",response);
        const file_data = await extractText(file_path , response. file_type);
        //const summarized_data = await data_summarizer(file_data);
        return file_data;
        //return response;
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
