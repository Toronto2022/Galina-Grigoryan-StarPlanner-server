const knex = require("knex")(require("../knexfile"));
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const randomImage = await knex("images")
      .select("url")
      .orderByRaw("RAND()")
      .limit(1)
      .first();

    if (randomImage) {
      res.json({ url: randomImage.url });
    } else {
      res.status(404).json({ message: "No images found" });
    }
  } catch (error) {
    console.error("Error fetching random image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
