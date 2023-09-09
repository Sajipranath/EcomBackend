const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    fullName: String,
    deliveryInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryInfo',
  },
  },
  {
    timestamps: true,
  },
)

const User = mongoose.model('user', userSchema)
module.exports = User
