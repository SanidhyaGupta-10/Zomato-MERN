const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const { v4: uuid } = require('uuid');

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

module.exports = { createFood };
