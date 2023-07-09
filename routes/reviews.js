const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { validateReview, isLogged, isReviewAuthor } = require("../middleware");
const { createReview, deleteReview } = require("../controllers/reviews");

router.post("/", validateReview, isLogged, catchAsync(createReview));

router.delete("/:reviewId", isLogged, isReviewAuthor, catchAsync(deleteReview));

module.exports = router;
