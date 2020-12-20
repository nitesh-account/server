import express from 'express';

import { getRandomData, createRandomData, resetRandomData, deleteRandomData, expireRandomData } from '../controllers/randomdata.js'

const router = express.Router();

router.get('/', getRandomData)
router.post('/', createRandomData)
router.delete('/', resetRandomData)
router.put('/setDeleted', deleteRandomData)
router.put('/setExpired', expireRandomData)

export default router; 
