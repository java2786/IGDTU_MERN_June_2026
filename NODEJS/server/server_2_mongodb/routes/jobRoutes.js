const express = require('express')
const router = express.Router();

const {getAllJobs, getJobById, createJob} = require("./../controllers/jobControllers")

router.post("/", createJob)
router.get("/", getAllJobs)
router.get("/:id", getJobById)

module.exports = router