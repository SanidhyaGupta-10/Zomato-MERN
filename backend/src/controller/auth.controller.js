const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodPartner.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Controllers

async function registerUser(req, res){
    const { fullName, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });

    if(isUserAlreadyExist){
        return res.status(400).json({
            message: 'User already exist'
        })
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    });
    
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET);

    res.cookie('token', token)

    res.status(200).json({
        message: "User registered successfully",
        user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
        },
    });
}
async function loginUser(req, res){
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if(!user){
        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }

     const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET);

    res.cookie('token', token)

    res.status(200).json({
        message: "User Logged in successfully",
        user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
        },
    });

}
function logoutUser(req, res){
    res.clearCookie('token');
    res.status(200).json({
        message: "User Logged out successfully",
    });
}

// Food-Partner Controllers

async function registerFoodPartner(req, res){
    const { name, email, password } = req.body;
    const isAccountAlreadyExist = await foodPartnerModel.findOne({ email });

    if(isAccountAlreadyExist){
        return res.status(400).json({
            message: 'User already exist'
        })
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword
    });
    
    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET);

    res.cookie('token', token)

    res.status(200).json({
        message: "User registered successfully",
        user:{
            _id: foodPartner._id,
            email: foodPartner.email,
            fullName: foodPartner.fullName,
        },
    });
}
async function loginFoodPartner(req, res){
    const { email, password } = req.body;
    const foodPartner = await foodPartnerModel.findOne({ email });

      if(!foodPartner){
        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }

     const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET);

    res.cookie('token', token)

    res.status(200).json({
        message: "Partner Logged in successfully",
        foodPartner:{
            _id: foodPartner._id,
            email: foodPartner.email,
            fullName: foodPartner.fullName,
        },
    });
}
function logoutFoodPartner(req, res){
    res.clearCookie('token');
    res.status(200).json({
        message: "Food Partner Logged out successfully",
    });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
};