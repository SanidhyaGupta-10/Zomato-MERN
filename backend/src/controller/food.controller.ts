const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const likeModel = require('../models/likes.model');
const { v4: uuid } = require('uuid');
const saveModel = require('../models/save.model');



async function createFood(req, res) {
  try {
    console.log(req.foodPartner)
    console.log(req.body)
    console.log(req.file)

    // Upload video
    const uploadResult = await storageService.uploadFile(
      req.file.buffer,
      `${uuid()}-${req.file.originalname}`
    );

    // Create food/video record
    const food = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: uploadResult.url,   // store uploaded video URL
      foodPartner: req.foodPartner._id
    });

    return res.status(201).json({
      message: 'Video created successfully',
      food
    });

  } catch (error) {
    console.error('Create video error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({})
  res.status(200).json({
    message: 'Food items fetched successfully',
    foodItems
  })
}

async function likeFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likeModel.findOne({
    user: user._id,
    food: foodId
  });
  if (isAlreadyLiked) {
    await likeModel.deleteOne({
      user: user._id,
      food: foodId
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: -1 }
    });


    return res.status(200).json({ message: 'Food unliked successfully' });
  }

  const like = await likeModel.create({
    user: user._id,
    food: foodId
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 }
  });


  return res.status(201).json({ message: 'Food liked successfully', like });
}

async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    food: foodId,
    user: user._id
  });
  if (isAlreadySaved) {
    await saveModel.deleteOne({
      food: foodId,
      user: user._id
    });

    return res.status(200).json({ message: 'Food unsaved successfully' });
  }

  const save = await saveModel.create({
    food: foodId,
    user: user._id
  });

  return res.status(201).json({ message: 'Food saved successfully', save });
}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood
};
