import Applicant from '../models/ApplicantsModel.js'


// GET ALL APPLICANTS
export const getApplications = async (req, res) => {
  try {
    const data = await Applicant.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// APPLY FOR JOB
export const applyJob = async (req, res) => {
  try {
    const newApp = new Applicant(req.body);
    const saved = await newApp.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE STATUS
export const updateApplicationStatus = async (req, res) => {
  try {
    const updated = await Applicant.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};