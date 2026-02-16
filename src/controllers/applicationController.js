const Application = require("../models/Application");
const Job = require("../models/Job");
const { notificationQueue } = require("../config/queue");

// Apply to job
exports.applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const application = await Application.create({
      job: jobId,
      candidate: req.user.userId,
    });

    // Push async job to queue
    await notificationQueue.add("job-applied", {
      jobId,
      candidateId: req.user.userId,
    },
{
    backoff:{
        type:"exponential",


    },
    removeOnComplete:true,
    removeOnFail:true,
}
);

    res.status(201).json({
      message: "Applied successfully",
      application,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "You have already applied to this job" });
    }

    res.status(500).json({ message: error.message });
  }
};

// Get my applications (candidate)
exports.getMyApplication = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user.userId,
    }).populate({
        path: "job",
        populate: {
          path: "company",
          select: "name",  }
      })
      .lean();;

    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Recruiter → view applications for a job
exports.getApplicationsForJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate("company");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.company.recruiter.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to view applications" });
    }

    const applications = await Application.find({ job: jobId }).populate(
      "candidate",
      "name email"
    );

    res.json({ applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update application status (recruiter)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["APPLIED", "REJECTED", "SHORTLISTED", "HIRED"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(req.params.id).populate({
      path: "job",
      populate: { path: "company" },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.job.company.recruiter.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this application" });
    }

    application.status = status;
    await application.save();

    res.json({
      message: "Application status updated",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
