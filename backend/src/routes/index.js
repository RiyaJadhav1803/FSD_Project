const express = require('express');
const router = express.Router();
const v1ApiRoutes = require('./v1/index.js');
router.use('/v1', v1ApiRoutes);//whenever we get the /v1 api routes map it to the v1ApiRoutes and inside v1ApiRoutes call to the './v1/index'
router.post('/logout', (req, res) => {
    try {
        res.clearCookie('user');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Logout failed' });
    }
});

// Fetch Summarized Documents of the Logged-In User

module.exports = router;