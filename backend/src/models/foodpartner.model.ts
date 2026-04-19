const mongoose = require("mongoose");

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

// ✅ Prevent OverwriteModelError
const FoodPartner =
  mongoose.models.foodPartner ||
  mongoose.model("foodPartner", foodPartnerSchema);

module.exports = FoodPartner;
