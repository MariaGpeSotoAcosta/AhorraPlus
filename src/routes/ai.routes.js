import { Router } from 'express';
import { chatbotResponse } from '../controllers/ai.controller.js';
import { authRequired } from '../middlewares/validateToken.js'

const router = Router();

router.post('/chatbot', authRequired, chatbotResponse);

export default router;
