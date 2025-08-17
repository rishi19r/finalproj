const Job = require("../models/Job");

exports.createJob = async (req, res) => {
    try {
        const job = new Job({
            postedBy: req.user.id,
            title: req.body.title,
            description: req.body.description,
            skills: req.body.skills,
            location: req.body.location
        });
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("postedBy", "name profilePic");
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.applyJob = async (req, res) => {
    try {
        await Job.findByIdAndUpdate(req.params.jobId, {
            $addToSet: { applicants: req.user.id }
        });
        res.json({ msg: "Applied to job" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
