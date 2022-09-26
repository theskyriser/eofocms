import express, { Router } from 'express'
import {getAdmins, createAdmin, updateAdmin, deleteAdmin} from '../controllers/users.js';
import auth from '../middleware/auth.js'


const router = express.Router();

router.get('/', getAdmins)
router.post('/', auth, createAdmin)
router.patch('/:id', auth, updateAdmin)
router.delete('/:id', deleteAdmin)

export default router;