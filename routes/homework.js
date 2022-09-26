import express, { Router } from 'express'
import { createHomework, deleteHomework, getHomework, updateHomework, getHomeworkByStudent} from '../controllers/homework.js';
import auth from '../middleware/auth.js'


const router = express.Router();

router.get('/', getHomework)
router.get('/:id', getHomeworkByStudent)
router.post('/', auth, createHomework)
router.patch('/:id', auth, updateHomework)
router.delete('/:id', deleteHomework)

export default router;