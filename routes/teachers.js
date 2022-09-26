import express, { Router } from 'express'
import { getTeachers, createTeacher, updateTeacher, deleteTeacher } from '../controllers/teachers.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', getTeachers)
router.post('/', auth, createTeacher)
router.patch('/:id', auth, updateTeacher)
router.delete('/:id', deleteTeacher)

export default router;