const Tesseract = require("tesseract.js");
const path = require("path");
const fs = require("fs-extra");
const { exec } = require("child_process");

require('dotenv').config();

const uploadRepository = require('../repository/upload-repository.js');
const uploadRepo = new uploadRepository();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const {GEMINI_API_KEY} = require('../config/serverconfig.js');
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//function to summarize data
const data_summarizer = async (file_data)=>{
    try{
        const prompt = "Summarize the following text in half the words or less, the input text is:"+file_data;;
        const result = await model.generateContent(prompt);
        console.log("Gemini o/p 1",result.response.text());
        return result.response.text();
    }catch(error){
        console.log("Error summarizing data", error);
        return error;
    }
}

//function to extract text from image and pdf
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
        //need to complete this part
    }

}

const saveFile = async (fileData, file_path ) => {
    try {
        console.log("Service Layer Called 1", fileData);
        const response = await uploadRepo.storeFile(fileData);
        console.log("From upload service88",response);
        //call to extract text
        const file_data = await extractText(file_path , response. file_type);
        //call to summarize data
        const summarized_data = await data_summarizer(file_data);
        //original file data
        console.log("file data", file_data);
        console.log("=====================================");
        //summarized data
        console.log("summarized data", summarized_data);
        return summarized_data;
        //return file_data;
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
