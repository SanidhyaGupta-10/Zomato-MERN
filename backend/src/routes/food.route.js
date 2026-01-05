const express = require('express');
const foodController = require('../controller/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
const multer = require('multer');

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

module.exports = router;