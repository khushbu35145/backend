

import University from "../models/University.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// ✅ Create University
export const createUniversity = async (req, res) => {
  try {
    const { universityName, mode, district, state } = req.body;
    let logoUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "universities",
      });
      logoUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // remove local file
    }

    const university = new University({
      universityName,
      logo: logoUrl,
      mode,
      district,
      state,
    });

    await university.save();
    res.status(201).json({ message: "University added successfully", university });
  } catch (error) {
    res.status(500).json({ message: "Error adding university", error: error.message });
  }
};

// ✅ Get All Universities
export const getUniversities = async (req, res) => {
  try {
    const universities = await University.find().sort({ createdAt: -1 });
    res.json(universities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching universities", error: error.message });
  }
};

// ✅ Delete University
export const deleteUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    await University.findByIdAndDelete(id);
    res.json({ message: "University deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting university", error: error.message });
  }
};

// ✅ Update University
export const updateUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const { universityName, mode, district, state } = req.body;

    let updateData = { universityName, mode, district, state };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "universities",
      });
      updateData.logo = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const university = await University.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }

    res.json({ message: "University updated successfully", university });
  } catch (error) {
    res.status(500).json({ message: "Error updating university", error: error.message });
  }
};
