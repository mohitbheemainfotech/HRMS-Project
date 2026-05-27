import mongoose from "mongoose";

const performanceReviewSchema = new mongoose.Schema(
  {
    employee: {
      type: String,
      required: true,
    },

    reviewer: {
      type: String,
      required: true,
    },

    period: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    comments: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const PerformanceReview = mongoose.model(
  "PerformanceReview",
  performanceReviewSchema
);

export default PerformanceReview;