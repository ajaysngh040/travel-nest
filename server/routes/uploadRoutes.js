const express = require("express");
const multer = require("multer");
const {
  uploadImage,
  uploadByLink,
} = require("../controllers/uploadController");

const upload = multer({ dest: "uploads/" }); // Temporary local storage before Cloudinary upload

const router = express.Router();
router.post("/file", upload.single("image"), uploadImage);
router.post("/url", uploadByLink);

module.exports = router;
