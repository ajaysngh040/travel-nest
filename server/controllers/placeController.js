const Place = require("../models/Place");

// Create a Place
exports.createPlace = async (req, res) => {
  try {
    const placeData = { ...req.body, owner: req.user.id };
    const place = await Place.create(placeData);
    res.status(201).json(place);
  } catch (error) {
    res.status(500).json({ error: "Failed to create place" });
  }
};

// Get all places (Cards)
exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch places" });
  }
};

// Get a single Place by ID
exports.getPlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id);
    if (!place) return res.status(404).json({ error: "Place not found" });

    res.json(place);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch place" });
  }
};

exports.updatePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ error: "Place not found" });

    if (!place.owner.equals(req.user.id)) {
      // Use .equals()
      return res.status(403).json({ error: "Unauthorized" });
    }

    Object.assign(place, req.body);
    await place.save();
    res.json({ message: "Place updated successfully", place });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update place" });
  }
};

exports.deletePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ error: "Place not found" });

    if (!place.owner.equals(req.user.id)) {
      // Use .equals()
      return res.status(403).json({ error: "Unauthorized" });
    }

    await place.deleteOne();
    res.json({ message: "Place deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete place" });
  }
};
