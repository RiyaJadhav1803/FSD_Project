const dotenv = require('dotenv');
const { mongo } = require('mongoose');
dotenv.config();

// Exporting port value from environment variable with fallback to 5050
module.exports = {
    PORT: 5050,
    GEMINI_API_KEY : process.env.GEMINI_API_KEY,
    mongostring : process.env.mongostring,
}
