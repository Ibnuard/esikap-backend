const express = require("express");

const router = express.Router();

// controllers
const dev = require("../controllers/dev.controller");
const user = require("../controllers/superuser.controller");
const phqc = require("../controllers/phqc.controller");
const cop = require("../controllers/cop.controller");
const sscec = require("../controllers/sscec.controller");
const p3k = require("../controllers/p3k.controller");

// ==== routes

// Dev
router.post("/dev", dev.testPayload);

// USER
router.post("/user/login", user.login);

// UPLOAD DOC
router.post("/upload/phqc", phqc.uploadPHQC);

// P3K
router.post("/upload/p3k", p3k.uploadP3K);

// COP
router.post("/upload/sscec", sscec.uploadSSCEC);
router.post("/upload/sscec/single", sscec.uploadSingleDocSSCEC);
router.post("/upload/sscec/delete/:id", sscec.deleteCOPFolder);

// COP
router.post("/upload/cop", cop.uploadCOP);
router.post("/upload/cop/single", cop.uploadSingleDoc);
router.post("/upload/cop/delete/:id", cop.deleteCOPFolder);

module.exports = { router };
