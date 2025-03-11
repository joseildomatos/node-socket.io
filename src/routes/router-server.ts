
import express from 'express';

const GlobalSocket = require("../controllers/controller-server");
const EmailSocket = require("../controllers/controller-server");
const TotemSocket = require("../controllers/controller-server");
const MensageiroSocket = require("../controllers/controller-server");
const PadioleiroSocket = require("../controllers/controller-server");


const router = express.Router();

router.route('/socketSCMM/Global').get(GlobalSocket);
router.route('/socketSCMM/Email').get(EmailSocket);
router.route('/socketSCMM/Create').get(TotemSocket);
router.route('/socketSCMM/Update').get(MensageiroSocket);
router.route('/socketSCMM/Delete').get(PadioleiroSocket);

export default router;
