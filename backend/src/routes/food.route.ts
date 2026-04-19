import express from 'express';
import { createFood, getFoodItems, likeFood, saveFood } from '../controller/food.controller';
import { authFoodPartnerMiddleware, authUserMiddleware } from '../middlewares/auth.middleware';
import multer from 'multer';

const router = express.Router();

// express can't read any files
// that's why we installed multer

const upload = multer({
    storage: multer.memoryStorage(),
})

// Call to this API prefix=> /api/food "/" - this is the route
// http://localhost:3000/api/food/
//                     [protected]
// POST /api/food
router.post('/',
    authFoodPartnerMiddleware,
    upload.single('video'),
    createFood
);
// GET
router.get('/',
    authUserMiddleware,
    getFoodItems,
)
// GET
router.post('/like',
    authUserMiddleware,
    likeFood
)

router.post('/save',
    authUserMiddleware,
    saveFood
)

export default router;