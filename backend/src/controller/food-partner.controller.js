const foodPartnerModel = require('../models/foodpartner.model')
const foodModel = require('../models/food.model')

async function getFoodByPartnerId(req, res) {
    const foodPartnerId = req.params.id;

    // Validate ObjectId before querying to avoid CastError
    const mongoose = require('mongoose')
    if (!mongoose.Types.ObjectId.isValid(foodPartnerId)) {
        return res.status(400).json({ message: 'Invalid food partner id' });
    }

    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodItemsbyFoodPartner = await foodModel.find({ foodPartner: foodPartnerId });

    if (!foodPartner) {
        return res.status(404).json({ message: 'Food Partner not found' });
    }
    return res.status(200).json({ 
        message: 'Food Partner fetched successfully',
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemsbyFoodPartner
        }
    });
}

module.exports = {
    getFoodByPartnerId
};