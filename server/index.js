const express = require("express");
const cors = require("cors");
const spendRoutes = require("./routes/spendRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", spendRoutes);  

app.get("/", (req, res) => {
  res.send("Cloud Spend API Running");
});

// Export the app for serverless platforms (e.g., Vercel)
module.exports = app;

// Start a local server only when not running on serverless
const port = process.env.PORT || 10000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});   

