
import University from "../models/University.js";

// Create new university
export const createUniversity = async (req, res) => {
  try {
    const { universityName, mode, district, state } = req.body;
    const logo = req.file ? req.file.path : null; // logo from file upload

    const university = new University({
      universityName,
      logo,
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

// Get all universities
export const getUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    res.json(universities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching universities", error: error.message });
  }
};

// Delete university
export const deleteUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    await University.findByIdAndDelete(id);
    res.json({ message: "University deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting university", error: error.message });
  }
};
// Update university
export const updateUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const { universityName, mode, district, state } = req.body;

    const updateData = { universityName, mode, district, state };

    if (req.file) {
      updateData.logo = req.file.path; // update logo if a new one uploaded
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

