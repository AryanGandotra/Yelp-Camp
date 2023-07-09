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
const { route } = require("./campgrounds.js");

router
  .route("/")
  .get(catchAsync(index))
  .post(isLogged, validateCampground, catchAsync(createCampground));

router.route("/new").get(isLogged, renderNewForm);

router
  .route("/:id")
  .get(catchAsync(showCampground))
  .put(isLogged, isAuthor, validateCampground, catchAsync(updateCampground))
  .delete(isLogged, isAuthor, catchAsync(deleteCampground));

router.route("/:id/edit").get(isLogged, isAuthor, catchAsync(renderEditForm));

module.exports = router;
