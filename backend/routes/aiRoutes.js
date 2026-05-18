const express = require('express');
const router = express.Router();
const { 
    generateAIRecommendations, 
    handleAIChatMessage,
    getBasicMatch, // Import newly built handler
    getAIShortlist // Import newly built handler
} = require('../controllers/aiController');

router.post('/recommend', generateAIRecommendations);
router.post('/chat', handleAIChatMessage);
router.get('/basic-match', getBasicMatch);     // Route: GET /api/ai/basic-match
router.post('/shortlist', getAIShortlist);     // Route: POST /api/ai/shortlist

module.exports = router;