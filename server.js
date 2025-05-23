const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 8000;

app.use(express.json());

// Static files tanpa prefix
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// Routing
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});
app.get("/top-up", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "top-up.html"));
});
app.get("/payment", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "halaman-pembayaran.html"));
});
app.get("/list-game", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "list-game.html"));
});
app.get("/artikel", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "artikel.html"));
});
app.get("/news", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "news-home.html"));
});

app.listen(PORT, () => {
  console.log(`Server nyala di http://localhost:${PORT}`);
});
