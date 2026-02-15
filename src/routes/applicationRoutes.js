const express = require('express');
const router = express.Router();
const { authorize } = require('../middleware/roleMiddleware');
const {protect} = require('../middleware/authMiddleware');
const{
    applyJob,getMyApplication,getApplicationsForJob,updateApplicationStatus
} = require('../controllers/applicationController');

router.post('/jobs/:id/apply',protect ,authorize('CANDIDATE'),applyJob);
router.get('/me',protect,authorize('CANDIDATE'), getMyApplication);

router.get('/jobs/:id',protect,authorize('RECRUITER'), getApplicationsForJob);
router.put('/:id/status',protect,authorize('RECRUITER'), updateApplicationStatus);

module.exports = router;