const express = require("express");
const {verifyToken} = require("../middleware/auth");
const router = express.Router()

const {applyToJob, getMyProfile, evaluateMatch, updateResume} = require("../controllers/candidateController")

// http://localhost:3000/api/candidate
router.post("/apply",verifyToken, applyToJob)
router.get("/me",verifyToken, getMyProfile)

router.get("/match", verifyToken, evaluateMatch)
router.post("/me/resume", verifyToken, updateResume)

module.exports = router
