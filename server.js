const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API is running ✅");
});

app.get("/hello", (req, res) => {
  res.json({ message: "Hello from my Node.js API 👋" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
