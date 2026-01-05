const express = require('express');
const router = express.Router();
const foodPartnerController = require('../controller/food-partner.controller');
const authMiddleware = require('../middlewares/auth.middleware');


// Call to this API prefix=> /api/food "/" - this is the route
// http://localhost:3000/api/food/

// GET /api/food-partner/:id
router.get('/:id', 
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodByPartnerId
)


module.exports = router;