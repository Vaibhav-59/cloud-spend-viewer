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

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
