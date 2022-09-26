import express, { Router } from 'express'
import { getStudents, createStudents, updateStudents, deleteStudents, getStudentsByTeacher } from '../controllers/students.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', getStudents)
router.get('/by', getStudentsByTeacher)
router.post('/', auth, createStudents)
router.patch('/:id', auth, updateStudents)
router.delete('/:id', deleteStudents)

export default router;