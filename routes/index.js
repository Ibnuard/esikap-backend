const express = require("express");

const router = express.Router();

// controllers
const dev = require("../controllers/dev.controller");
const user = require("../controllers/superuser.controller");
const phqc = require("../controllers/phqc.controller");
const cop = require("../controllers/cop.controller");
const sscec = require("../controllers/sscec.controller");
const p3k = require("../controllers/p3k.controller");
const kapal = require("../controllers/kapal.controller");

// ==== routes

// Dev
router.post("/dev", dev.testPayload);

// USER
router.post("/user/login", user.login);
router.post("/user/status", user.cekStatus);
router.post("/user/avatar/:id", user.updateProfile);

// UPLOAD DOC
router.post("/upload/phqc", phqc.uploadPHQC);
router.post("/upload/phqc/single", phqc.uploadSingleDocPHQC);
router.post("/upload/phqc/delete/:id", phqc.deletePHQCFolder);

// P3K
router.post("/upload/p3k", p3k.uploadP3K);
router.post("/upload/p3k/single", p3k.uploadSingleDocP3K);
router.post("/upload/p3k/delete/:id", p3k.deleteP3KFolder);

// SSCEC
router.post("/upload/sscec", sscec.uploadSSCEC);
router.post("/upload/sscec/single", sscec.uploadSingleDocSSCEC);
router.post("/upload/sscec/delete/:id", sscec.deleteCOPFolder);

// COP
router.post("/upload/cop", cop.uploadCOP);
router.post("/upload/cop/single", cop.uploadSingleDoc);
router.post("/upload/cop/delete/:id", cop.deleteCOPFolder);

// kapal
router.get("/kapal/:type", kapal.get_all_kapal);
router.post("/kapal/update-status/:id", kapal.update_status_kapal);

module.exports = { router };
