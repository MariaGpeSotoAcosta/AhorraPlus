import { Router } from 'express';
import { saveFixedCosts, getFixedCosts, saveRangeCosts, getRangeCosts } from '../controllers/costs.controller.js';
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validator.middleware.js';
import { fixedCostSchema, rangeCostSchema } from '../schemas/costs.schema.js'

const router = Router();

router.post('/fixedcosts', authRequired, validateSchema(fixedCostSchema), saveFixedCosts);
router.get('/fixedcosts', authRequired, getFixedCosts);

router.post('/rangecosts', authRequired, validateSchema(rangeCostSchema), saveRangeCosts);
router.get('/rangecosts', authRequired, getRangeCosts);

export default router;