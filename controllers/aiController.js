const aiService = require('../services/aiService');


exports.handleAI = async (req, res, next) => {
  try {
    const rawData = await aiService.sendPromptToGemini(
      req.body.promptUser,
      req.body.promptSystem,
      req.body.model
    );

    let data;

    // Try parsing the response as clean JSON
    if (/^\s*{[\s\S]*}\s*$/.test(rawData)) {
      try {
        data = JSON.parse(rawData);
      } catch (parseErr) {
        console.warn('Failed to parse clean JSON:', parseErr);
      }
    }

    // If parsing fails, remove Markdown markers and try again
    if (!data) {
      const cleaned = rawData.replace(/```json|```/g, '').trim();
      try {
        data = JSON.parse(cleaned);
      } catch (finalErr) {
        console.error('Failed to parse response even after cleaning:', finalErr);
        return res.status(500).json({ error: 'Invalid JSON format in AI response.' });
      }
    }

    res.json(data);

  } catch (err) {
    console.error('Error in controller:', err);
    next(err);
  }
};