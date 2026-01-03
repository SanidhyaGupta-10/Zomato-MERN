const foodPartnerModel = require('../models/foodPartner.model');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    try {
        // it will verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const foodPartner = await foodPartnerModel.findById(decoded.id)

        req.foodPartner = foodPartner;
        next();

    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}

async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;
}

module.exports = {
    authFoodPartnerMiddleware
}