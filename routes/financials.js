import express, { Router } from 'express'
import { getAdminTodayOverwiew, getFinancialsByDates, getTeacherTodayOverview } from '../controllers/financials.js';
import auth from '../middleware/auth.js'


const router = express.Router();

router.get('/search', getFinancialsByDates)
router.get('/overviewadmin', getAdminTodayOverwiew)
router.get('/overviewteacher', getTeacherTodayOverview)

export default router;