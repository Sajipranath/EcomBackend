// models/DeliveryInfo.js
const mongoose = require('mongoose');

const deliveryInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for association
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  // You can add more fields as needed
}, { timestamps: true });

const DeliveryInfo = mongoose.model('DeliveryInfo', deliveryInfoSchema);

module.exports = DeliveryInfo;
