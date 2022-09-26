import express, { Router } from 'express'
import {getClasses, createClasses, updateClasses, deleteClass, getClassesBySearch} from '../controllers/classes.js';
import auth from '../middleware/auth.js'


const router = express.Router();

router.get('/', getClasses)
router.get('/search', getClassesBySearch)
router.post('/', auth, createClasses)
router.patch('/:id', auth, updateClasses)
router.delete('/:id', deleteClass)

export default router;