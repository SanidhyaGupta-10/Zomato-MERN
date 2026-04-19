import express from 'express';
import { getFoodByPartnerId } from '../controller/food-partner.controller';
import { authUserMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

// Call to this API prefix=> /api/food "/" - this is the route
// http://localhost:3000/api/food/

// GET /api/food-partner/:id
router.get('/:id',
    authUserMiddleware,
    getFoodByPartnerId
)

export default router;