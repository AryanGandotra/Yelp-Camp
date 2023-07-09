const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync.js");
const { isLogged, isAuthor, validateCampground } = require("../middleware");
const {
  index,
  renderNewForm,
  createCampground,
  showCampground,
  renderEditForm,
  updateCampground,
  deleteCampground,
} = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(index))
  .post(
    isLogged,
    upload.array("image"),
    validateCampground,
    catchAsync(createCampground)
  );

router.route("/new").get(isLogged, renderNewForm);

router
  .route("/:id")
  .get(catchAsync(showCampground))
  .put(
    isLogged,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(updateCampground)
  )
  .delete(isLogged, isAuthor, catchAsync(deleteCampground));

router.route("/:id/edit").get(isLogged, isAuthor, catchAsync(renderEditForm));

module.exports = router;
