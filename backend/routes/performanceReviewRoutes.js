import express from "express";

import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/performanceReviewController.js";

const performanceReviewRouter = express.Router();


// GET ALL
performanceReviewRouter.get("/", getReviews);


// CREATE
performanceReviewRouter.post("/", createReview);


// UPDATE
performanceReviewRouter.put("/:id", updateReview);


// DELETE
performanceReviewRouter.delete("/:id", deleteReview);

export default performanceReviewRouter;