const express = require("express");
const {
  handleGenerateNewShortURL,
  handleURLAnalytics,
  handleShortIdRender,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleURLAnalytics);

router.get("/:shortId", handleShortIdRender);

module.exports = router;
