var express = require("express");
var router = express.Router();
var fq = require("fuzzquire");
let fileUpload = require("express-fileupload");
var users = fq("users");
var config = fq("config");
var path = require("path");
var fs = require("fs");
let appRoot = require("app-root-path");
const { check, validationResult, body } = require("express-validator/check");

router.use(
  fileUpload({
    safeFileNames: true,
    preserveExtension: true,
    limits: {
      fileSize: 10 * 1024 * 1024
    }
  })
);

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/team", function (req, res, next) {
  res.render("team", {
    users: users[config.siteMode],
    column: 3,
    totalModules: 17
  });
});

router.get("/test", function (req, res, next) {
  res.render("test", {
    dashboard: {
      type: "Administrator"
    },
    user: {
      name: "Karthik"
    },
    portals: [],
  });
});

router.post("/test", [
  check("from")
    .exists()
    .withMessage("No From Page Specified")
    .not()
    .isEmpty()
    .withMessage("No From Page Specified")
    .isInt({
      gt: 0
    })
    .withMessage("Invalid From Page"),
  check("to")
    .exists()
    .withMessage("No To Page Specified")
    .not()
    .isEmpty()
    .withMessage("No To Page Specified")
    .isInt({
      gt: 0
    })
    .withMessage("Invalid To Page"),
], function (req, res, next) {
  const errors = validationResult(req);
  console.log(req.body);
  if (!errors.isEmpty()) {
    return res.render("form-errors", {
      errors: errors.mapped()
    });
  }
  res.render("./test", {
    dashboard: {
      type: "Administrator"
    },
    user: {
      name: "Karthik"
    },
    portals: [],
    status: "success"
  });
});

router.get("/type", function (req, res, next) {
  res.render("type");
});

router.get("/fd-thesis", function (req, res) {
  fs.readdir(appRoot.path + "/public/AUGSD/fd-thesis", function (err, files) {
    res.render("fd-thesis", { forms: files });
  });
});
router.get("/registration", function (req, res) {
  fs.readdir(appRoot.path + "/public/AUGSD/registration", function (err, files) {
    res.render("registration", { forms: files });
  });
});
module.exports = router;
