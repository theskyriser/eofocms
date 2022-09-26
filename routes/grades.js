import express, { Router } from 'express'
import { createGrades, deleteGrades, getGrades, updateGrades, getGradesByStudent} from '../controllers/grades.js';
import auth from '../middleware/auth.js'


const router = express.Router();

router.get('/', getGrades)
router.get('/:id', getGradesByStudent)
router.post('/', auth, createGrades)
router.patch('/:id', auth, updateGrades)
router.delete('/:id', deleteGrades)

export default router;