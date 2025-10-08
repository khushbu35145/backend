// // import University from "../models/UniversityTable.js";

// // // Add new university
// // export const createUniversity = async (req, res) => {
// //   try {
// //     const university = new University(req.body);
// //     await university.save();
// //     res.status(201).json(university);
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // };

// // // Get all universities
// // export const getUniversities = async (req, res) => {
// //   try {
// //     const universities = await University.find();
// //     res.json(universities);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // Get single university
// // export const getUniversityById = async (req, res) => {
// //   try {
// //     const university = await University.findById(req.params.id);
// //     if (!university) return res.status(404).json({ message: "Not found" });
// //     res.json(university);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // Update university
// // export const updateUniversity = async (req, res) => {
// //   try {
// //     const university = await University.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true }
// //     );
// //     if (!university) return res.status(404).json({ message: "Not found" });
// //     res.json(university);
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // };

// // // Delete university
// // export const deleteUniversity = async (req, res) => {
// //   try {
// //     const university = await University.findByIdAndDelete(req.params.id);
// //     if (!university) return res.status(404).json({ message: "Not found" });
// //     res.json({ message: "Deleted successfully" });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };
// import University from "../models/UniversityTable.js";

// // Add new university
// export const createUniversity = async (req, res) => {
//   try {
//     const university = new University(req.body);
//     await university.save();
//     res.status(201).json(university);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all universities
// export const getUniversities = async (req, res) => {
//   try {
//     const universities = await University.find();
//     res.json(universities);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get single university
// export const getUniversityById = async (req, res) => {
//   try {
//     const university = await University.findById(req.params.id);
//     if (!university) return res.status(404).json({ message: "Not found" });
//     res.json(university);
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
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete university
// export const deleteUniversity = async (req, res) => {
//   try {
//     const university = await University.findByIdAndDelete(req.params.id);
//     if (!university) return res.status(404).json({ message: "Not found" });
//     res.json({ message: "Deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
import CollegeCourse from "../models/UniversityTable.js";

// ✅ Add a new university under a course
export const addUniversity = async (req, res) => {
  try {
    const {
      courseName,
      universityName,
      specialisation,
      mode,
      eligibility,
      fees,
      examFee,
      registrationFee,
    } = req.body;

    let course = await CollegeCourse.findOne({ courseName });

    // If course doesn't exist, create it
    if (!course) {
      course = new CollegeCourse({
        courseName,
        universities: [
          {
            universityName,
            specialisation,
            mode,
            eligibility,
            fees,
            examFee,
            registrationFee,
          },
        ],
      });
    } else {
      // Otherwise, add to existing course
      course.universities.push({
        universityName,
        specialisation,
        mode,
        eligibility,
        fees,
        examFee,
        registrationFee,
      });
    }

    await course.save();
    res.status(201).json({ message: "University added successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all courses with universities
export const getAllCourses = async (req, res) => {
  try {
    const courses = await CollegeCourse.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get universities by course name
export const getUniversitiesByCourse = async (req, res) => {
  try {
    const { courseName } = req.params;
    const course = await CollegeCourse.findOne({ courseName });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course.universities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update a specific university inside a course
export const updateUniversity = async (req, res) => {
  try {
    const { courseName, universityId } = req.params;
    const updateData = req.body;

    const course = await CollegeCourse.findOne({ courseName });
    if (!course) return res.status(404).json({ message: "Course not found" });

    const university = course.universities.id(universityId);
    if (!university) return res.status(404).json({ message: "University not found" });

    // Update fields
    Object.assign(university, updateData);
    await course.save();

    res.json({ message: "University updated successfully", university });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete a university from a course
export const deleteUniversity = async (req, res) => {
  try {
    const { courseName, universityId } = req.params;

    const course = await CollegeCourse.findOne({ courseName });
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.universities = course.universities.filter(
      (uni) => uni._id.toString() !== universityId
    );
    await course.save();

    res.json({ message: "University deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
