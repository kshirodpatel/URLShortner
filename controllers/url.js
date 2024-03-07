const ShortUniqueId = require("short-unique-id");
const URL = require("../models/url");

//Generate New Short URL
const handleGenerateNewShortURL = async (req, res) => {
  const body = req.body;
  if (!body || !body.url) {
    return res.status(400).json({ error: "URL is required" });
  }
  const { randomUUID } = new ShortUniqueId({ length: 10 });
  const UID = randomUUID();

  await URL.create({
    shortId: UID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.status(201).json({ id: UID });
};

//Handle Analytics URL
const handleURLAnalytics = async (req, res) => {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });

  res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

//Handle URL render from shortId
const handleShortIdRender = async (req, res) => {
  const shortId = req.params.shortId;
  if (!shortId) {
    return res.status(404).json({ message: "shortId required" });
  }

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );

  res.redirect(entry.redirectURL);
};

module.exports = {
  handleGenerateNewShortURL,
  handleURLAnalytics,
  handleShortIdRender,
};
