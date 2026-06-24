const {middleware_usage} = require("./../middleware/demo_middleware")
const express = require('express')
const router = express.Router();

const {getAllJobs, getJobById, createJob} = require("./../controllers/jobControllers")

router.post("/", middleware_usage, createJob)
router.get("/", getAllJobs)
router.get("/:id", getJobById)

module.exports = router