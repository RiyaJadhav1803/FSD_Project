const express = require("express");
const router = express.Router();
const dashboardService = require("../services/dashboard-service");

router.get("/documents/:userId", async (req, res) => {
    try {
        const documents = await dashboardService.getDocuments(req.params.userId);
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: "Error fetching documents." });
    }
});

router.get("/documents/download/:documentId", async (req, res) => {
    try {
        await dashboardService.downloadSummary(req.params.documentId, res);
    } catch (error) {
        res.status(500).json({ message: "Error downloading summary." });
    }
});

module.exports = router;
