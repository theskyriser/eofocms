import express, { Router } from 'express'
import {getSessions, createSession, updateSession, deleteSession, getSessionsByPage, getSessionsBySearch, getSessionsForCalendar} from '../controllers/sessions.js';
import auth from '../middleware/auth.js'


const router = express.Router();

router.get('/', getSessions)
router.get('/pages', getSessionsByPage)
router.get('/search', getSessionsBySearch)
router.get('/calendar', getSessionsForCalendar)
router.post('/', createSession)
router.patch('/:id', updateSession)
router.delete('/:id', deleteSession)

export default router;