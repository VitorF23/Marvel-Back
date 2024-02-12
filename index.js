require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  try {
    return res.status(200).json("Bienvenue");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const ComicsRoutes = require("./routes/comic");
app.use(ComicsRoutes);

const CharactersRoutes = require("./routes/characters");
app.use(CharactersRoutes);

app.all("*", (req, res) => {
  return res.status(404).json("Cette page n'existe pas");
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
