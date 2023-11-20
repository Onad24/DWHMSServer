import express from 'express';

import { signup, login, isAuth } from '../controllers/auth.js';
import {
  getDepartments,
  getRoles,
  getBarangay,
  getMunicipality,
  getProvinces,
  insertPatient,
  getPatientByName,
  getPatients,
  getSched,
  getLabTest,
  getRequests,
  getScheduledRequests,
  insertLabRequests,
  insertSchedule,
  getSMS,
  updateSMS,
  getSchedCount,
} from '../controllers/data.js';

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);
// router.post('/whitelists', getWhitelists);

router.get('/private', isAuth);
router.get('/departments', getDepartments);
router.get('/roles', getRoles);
router.get('/patients', getPatients);
router.get('/barangays', getBarangay);
router.get('/municipalities', getMunicipality);
router.get('/provinces', getProvinces);
router.post('/postPatient', insertPatient);
router.get('/patientByName', getPatientByName);
router.get('/schedules', getSched);
router.get('/laboratoryTests', getLabTest);
router.get('/requests', getRequests);
router.get('/scheduledRequests', getScheduledRequests);
router.post('/postTests', insertLabRequests);
router.post('/postSchedule', insertSchedule);
router.post('/postSms', updateSMS);
router.get('/sms', getSMS);
router.get('/schedCount', getSchedCount);

// router.post('/getData', select);
// router.post('/savedata', insert);
// router.post('/profile', getProfile);
// router.post('/home', getContent);
// router.post('/insertPost', insertPost);
// router.post('/illnesses', getIllnesses);
// router.post('/vaccines', getVaccines);
// router.post('/insertConsultation', insertConsultation);
// router.post('/insertRegistration', insertRegistration);
// router.post('/insertDependents', insertDependents);
// router.post('/insertKonsulta', insertKonsulta);
// router.post('/insertPastHistory', insertPastHistory);
// router.post('/insertFamilyHistory', insertFamilyHistory);
// router.post('/insertSocialHistory', insertSocialHistory);
// router.post('/insertOBGyneHistory', insertOBGyneHistory);
// router.post('/insertPhysicalExam', insertPhysicalExam);
// router.post('/insertImmunizations', insertImmunizations);
// router.post('/insertPertinentFindings', insertPertinentFindings);
// router.post('/insertHighRiskAssessment', insertHighRiskAssessment);
// router.post('/getRemarks', getRemarks);
// router.get('/getConsultation', getConsultation);
// router.post('/updateConsultation', updateConsultation);

router.get('/public', (req, res, next) => {
  res.status(200).json({ message: 'here is your public resource' });
});

// will match any other path
router.use('/', (req, res, next) => {
  res.status(404).json({ error: 'page not found' });
});

export default router;
