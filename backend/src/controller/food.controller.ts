import foodModel from '../models/food.model';
import { uploadFile } from '../services/storage.service';
import likeModel from '../models/likes.model';
import { v4 as uuid } from 'uuid';
import saveModel from '../models/save.model';
import { Request, Response } from 'express';

async function createFood(req: any, res: Response): Promise<void> {
  try {
    console.log(req.foodPartner)
    console.log(req.body)
    console.log(req.file)

    // Upload video
    const uploadResult = await uploadFile(
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

    res.status(201).json({
      message: 'Video created successfully',
      food
    });

  } catch (error) {
    console.error('Create video error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getFoodItems(req: any, res: Response): Promise<void> {
  const foodItems = await foodModel.find({})
  res.status(200).json({
    message: 'Food items fetched successfully',
    foodItems
  })
}

async function likeFood(req: any, res: Response): Promise<void> {
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

    res.status(200).json({ message: 'Food unliked successfully' });
    return;
  }

  const like = await likeModel.create({
    user: user._id,
    food: foodId
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 }
  });

  res.status(201).json({ message: 'Food liked successfully', like });
}

async function saveFood(req: any, res: Response): Promise<void> {
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

    res.status(200).json({ message: 'Food unsaved successfully' });
    return;
  }

  const save = await saveModel.create({
    food: foodId,
    user: user._id
  });

  res.status(201).json({ message: 'Food saved successfully', save });
}

export { createFood, getFoodItems, likeFood, saveFood };
