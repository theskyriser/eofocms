import express, { Router } from 'express'
import { getPayrollBySearch } from '../controllers/payroll.js';
import auth from '../middleware/auth.js'


const router = express.Router();

router.get('/search', getPayrollBySearch)

export default router;