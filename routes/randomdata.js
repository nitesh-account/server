import express from 'express';

import { getPosts, createRandomData, resetRandomData, deleteRandomData, expireRandomData } from '../controllers/randomdata.js'

const router = express.Router();

router.get('/', getPosts)
router.post('/', createRandomData)
router.delete('/', resetRandomData)
router.put('/setDeleted', deleteRandomData)
router.put('/setExpired', expireRandomData)

export default router; 