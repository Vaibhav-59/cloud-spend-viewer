const { Router } = require('express');
const fs = require('fs');
const path = require('path');

const router = Router();

// Helper: load data from JSON file
function loadSpendData() {
  const dataPath = path.join(__dirname, '..', 'data', 'cloudSpend.json');
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

// GET /api/spend
// Supports optional filters via query params:
// - cloud (matches cloud_provider)
// - team
// - env
// - month (YYYY-MM) matches the beginning of ISO date string
router.get('/spend', (req, res) => {
  try {
    const { cloud, team, env, month } = req.query;
    const data = loadSpendData();

    const filtered = data.filter((item) => {
      // cloud filter
      if (cloud && String(item.cloud_provider).toLowerCase() !== String(cloud).toLowerCase()) {
        return false;
      }
      // team filter
      if (team && String(item.team).toLowerCase() !== String(team).toLowerCase()) {
        return false;
      }
      // env filter
      if (env && String(item.env).toLowerCase() !== String(env).toLowerCase()) {
        return false;
      }
      // month filter (YYYY-MM)
      if (month && typeof item.date === 'string' && !item.date.startsWith(month)) {
        return false;
      }
      return true;
    });

    res.json({ count: filtered.length, items: filtered });
  } catch (err) {
    console.error('Error in GET /api/spend:', err);
    res.status(500).json({ error: 'Failed to load spend data' });
  }
});

module.exports = router;
