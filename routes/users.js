import express, { Router } from 'express'
import {signIn, checkPassword, getAdmins, createAdmin, updateCredentials, updateAdmin, deleteAdmin} from '../controllers/users.js';
import auth from '../middleware/auth.js'


const router = express.Router();

router.post('/signin', signIn)
router.post('/checkPassword', checkPassword)
router.post('/update', updateCredentials)

export default router;