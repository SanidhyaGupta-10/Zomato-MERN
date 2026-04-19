import express from 'express';
import foodPartnerController from '../controller/food-partner.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

// Call to this API prefix=> /api/food "/" - this is the route
// http://localhost:3000/api/food/

// GET /api/food-partner/:id
router.get('/:id',
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodByPartnerId
)

export default router;