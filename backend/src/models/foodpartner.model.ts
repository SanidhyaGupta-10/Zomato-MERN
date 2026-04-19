import mongoose from "mongoose";

const foodPartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

const FoodPartner =
  mongoose.models.foodPartner ||
  mongoose.model("foodPartner", foodPartnerSchema);

export default FoodPartner;
