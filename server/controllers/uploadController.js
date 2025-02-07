const fs = require("fs");
const { cloudinary } = require("../config/cloudinary");

// Upload Image to Cloudinary (File Upload)
exports.uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads",
    });

    fs.unlinkSync(req.file.path); // Delete local file after upload
    res.json({
      message: "File uploaded successfully.",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ error: "Failed to upload image." });
  }
};

// Upload Image by URL to Cloudinary
exports.uploadByLink = async (req, res) => {
  const { link } = req.body;
  if (!link) {
    return res.status(400).json({ error: "Image URL is required." });
  }

  try {
    const result = await cloudinary.uploader.upload(link, {
      folder: "uploads",
    });

    res.json({
      message: "File uploaded successfully.",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ error: "Failed to upload image from URL." });
  }
};
