// import University from "../models/University.js";

// // Get all universities
// export const getUniversities = async (req, res) => {
//   try {
//     const universities = await University.find();
//     res.json(universities);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Add new university
// export const addUniversity = async (req, res) => {
//   try {
//     const { name, bgColor, icon } = req.body;
//     const newUniversity = new University({ name, bgColor, icon });
//     await newUniversity.save();
//     res.status(201).json(newUniversity);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update university
// export const updateUniversity = async (req, res) => {
//   try {
//     const university = await University.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!university) return res.status(404).json({ message: "Not found" });
//     res.json(university);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete university
// export const deleteUniversity = async (req, res) => {
//   try {
//     const university = await University.findByIdAndDelete(req.params.id);
//     if (!university) return res.status(404).json({ message: "Not found" });
//     res.json({ message: "University deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// controllers/universityController.js
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

