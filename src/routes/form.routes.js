import { Router } from 'express';
import { saveForm, getForm } from '../controllers/form.controller.js';
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validator.middleware.js';
import { formSchema } from '../schemas/form.schema.js';

const router = Router();

router.post('/form', authRequired, validateSchema(formSchema), saveForm);
router.get('/form', authRequired, getForm);

export default router;
