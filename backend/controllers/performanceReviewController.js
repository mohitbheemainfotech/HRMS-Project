import PerformanceReview from "../models/PerformanceReview.js";


// GET ALL REVIEWS
export const getReviews = async (req, res) => {
  try {
    const reviews = await PerformanceReview.find().sort({
      createdAt: -1,
    });

    res.json(reviews);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to fetch reviews",
      error: err.message,
    });
  }
};


// CREATE REVIEW
export const createReview = async (req, res) => {
  try {
    const newReview = new PerformanceReview(req.body);

    const savedReview = await newReview.save();

    res.status(201).json(savedReview);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to create review",
      error: err.message,
    });
  }
};


// UPDATE REVIEW
export const updateReview = async (req, res) => {
  try {
    const updated = await PerformanceReview.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(updated);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to update review",
      error: err.message,
    });
  }
};


// DELETE REVIEW
export const deleteReview = async (req, res) => {
  try {
    await PerformanceReview.findByIdAndDelete(req.params.id);

    res.json({
      message: "Review deleted successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to delete review",
      error: err.message,
    });
  }
};