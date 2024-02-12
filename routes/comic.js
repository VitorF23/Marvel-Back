const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics", async (req, res) => {
  console.log(req.query);
  let query = `apiKey=${process.env.API_KEY}`;

  if (req.query.title) {
    query = query + `&title=${req.query.title}`;
  }
  if (req.query.page) {
    query = query + `&skip=${(req.query.page - 1) * 100}`;
  }

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?${query}`
    );
    console.log(response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/comic/:comicId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.comicId}?apiKey=${process.env.API_KEY}`
    );
    console.log(response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    console.log(response.data);
    console.log("query", req.query);
    console.log("params", req.params.characterId);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
