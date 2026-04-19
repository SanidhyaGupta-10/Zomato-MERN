import foodPartnerModel from '../models/foodpartner.model';
import foodModel from '../models/food.model';
import mongoose from 'mongoose';
import { Response } from 'express';

async function getFoodByPartnerId(req: any, res: Response): Promise<void> {
    const foodPartnerId = req.params.id;

    // Validate ObjectId before querying to avoid CastError
    if (!mongoose.Types.ObjectId.isValid(foodPartnerId)) {
        res.status(400).json({ message: 'Invalid food partner id' });
        return;
    }

    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodItemsbyFoodPartner = await foodModel.find({ foodPartner: foodPartnerId });

    if (!foodPartner) {
        res.status(404).json({ message: 'Food Partner not found' });
        return;
    }
    res.status(200).json({ 
        message: 'Food Partner fetched successfully',
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemsbyFoodPartner
        }
    });
}

export { getFoodByPartnerId };