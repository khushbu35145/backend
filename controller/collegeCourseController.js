import Course from '../models/collegeCourse.js'
export const addUniversityToCourse = async (req, res) => {
  try {
    const { courseName, universityName, specialisation, mode, eligibility, fees } = req.body;

    // 🔍 Validation before saving
    if (!courseName || !universityName || !specialisation || !mode || !eligibility || !fees) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let course = await Course.findOne({ courseName });

    if (!course) {
      course = new Course({ courseName, universities: [] });
    }

    course.universities.push({ universityName, specialisation, mode, eligibility, fees });
    await course.save();

    res.status(201).json({ message: "University added successfully", course });
  } catch (error) {
    console.error("Error in addUniversityToCourse:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// 📜 Get Universities by Course
export const getUniversitiesByCourse = async (req, res) => {
  try {
    const { courseName } = req.params;
    const course = await Course.findOne({ courseName });

    if (!course) {
      return res.status(404).json({ message: "No data found for this course" });
    }

    res.json(course.universities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching universities", error: error.message });
  }
};

// ❌ Delete University from Course
export const deleteUniversityFromCourse = async (req, res) => {
  try {
    const { courseName, universityId } = req.params;

    const course = await Course.findOneAndUpdate(
      { courseName },
      { $pull: { universities: { _id: universityId } } },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "University removed", course });
  } catch (error) {
    res.status(500).json({ message: "Error deleting university", error: error.message });
  }
};
// ✏️ Update University in a Course
export const updateUniversityInCourse = async (req, res) => {
  try {
    const { courseName, universityId } = req.params;
    const { universityName, specialisation, mode, eligibility, fees } = req.body;

    const course = await Course.findOne({ courseName });
    if (!course) return res.status(404).json({ message: "Course not found" });

    const university = course.universities.id(universityId);
    if (!university) return res.status(404).json({ message: "University not found" });

    // update fields
    if (universityName) university.universityName = universityName;
    if (specialisation) university.specialisation = specialisation;
    if (mode) university.mode = mode;
    if (eligibility) university.eligibility = eligibility;
    if (fees) university.fees = fees;

    await course.save();

    res.json({ message: "University updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Error updating university", error: error.message });
  }
};
// 📌 Get all universities with their courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};

