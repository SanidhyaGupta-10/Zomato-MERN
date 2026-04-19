import express from 'express';
import foodController from '../controller/food.controller';
import authMiddleware from '../middlewares/auth.middleware';
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
    authMiddleware.authFoodPartnerMiddleware,
    upload.single('video'),
    foodController.createFood
);
// GET
router.get('/',
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems,
)
// GET
router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood
)

router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood
)

export default router;