const dotenv = require('dotenv');
dotenv.config();

// Exporting port value from environment variable with fallback to 5050
module.exports = {
    PORT: 5050
};
