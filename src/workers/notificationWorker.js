require("dotenv").config();
const Company = require("../models/Company");

const connectDB = require("../config/db");
const { Worker } = require("bullmq");
const { connection } = require("../config/queue");
const transporter = require("../config/email");
const User = require("../models/User");
const Job = require("../models/Job");

const startWorker = async () => {
  //   connect MongoDB in worker process
  await connectDB();

  const worker = new Worker(
    "notifications",
    async (job) => {
      if (job.name === "job-applied") {
        const { jobId, candidateId } = job.data;

        const candidate = await User.findById(candidateId);
        const jobData = await Job.findById(jobId).populate("company");

        if (!candidate || !jobData) {
          throw new Error("Candidate or Job not found");
        } 
        //throw new Error("Test retry failure");
        await transporter.sendMail({
          from: `"Job Portal" <${process.env.EMAIL_USER}>`,
          to: candidate.email,
          subject: `Application Submitted: ${jobData.title}`,
          html: `<h2>You applied for ${jobData.title}</h2>
                 <p>Company: ${jobData.company.name}</p>`,
        });

        console.log(" Email sent to:", candidate.email);
      }
    },
    { connection }
  );

  worker.on("failed", (job, err) => {
    console.error("❌ Job failed permanently");
  console.error("Job name:", job.name);
  console.error("Attempts made:", job.attemptsMade);
    console.error(" Job failed:", err.message);
  });

 };

startWorker();
     