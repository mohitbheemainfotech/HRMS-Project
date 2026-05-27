import Applicant from "../models/ApplicantsModel.js";
import Job from "../models/Job.js";

// GET ALL APPLICANTS
export const getApplications = async (req, res) => {
  try {
    const data = await Applicant.find().sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to fetch applicants",
      error: err.message,
    });
  }
};

// APPLY JOB
export const applyJob = async (req, res) => {
  try {
    const { name, email, resume } = req.body;

    // FIND JOB
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // CREATE APPLICANT
    const applicant = await Applicant.create({
      name,
      email,
      resume,
      role: job.title,
      date: new Date().toLocaleDateString(),
      status: "Applied",
    });

    res.status(201).json(applicant);

  } catch (err) {
    console.log("APPLY ERROR:", err);

    res.status(500).json({
      message: "Failed to apply job",
      error: err.message,
    });
  }
};

// UPDATE STATUS
export const updateApplicationStatus = async (req, res) => {
  try {
    const updated = await Applicant.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.json(updated);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to update status",
      error: err.message,
    });
  }
};