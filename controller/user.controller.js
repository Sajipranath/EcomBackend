const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const DeliveryInfo = require('../models/deliveryinfo');
const {sendResponseError} = require('../middleware/middleware')
const {checkPassword, newToken} = require('../utils/utility.function')

const signUpUser = async (req, res) => {
  const {email, fullName, password} = req.body
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hash = await bcrypt.hash(password, salt)

    await User.create({...req.body, password: hash})
    res.status(201).send('Sucessfully account created ')
    return
  } catch (err) {
    console.log('Error : ', err)
    sendResponseError(500, 'Something wrong please try again', res)
    return
  }
}

const signInUser = async (req, res) => {
  const {password, email} = req.body
  console.log(req.body)
  try {
    const user = await User.findOne({email})
    if (!!!user) {
      sendResponseError(400, 'You have to Sign up first !', res)
    }

    const same = await checkPassword(password, user.password)
    if (same) {
      let token = newToken(user)
      res.status(200).send({status: 'ok', token})
      return
    }
    sendResponseError(400, 'InValid password !', res)
  } catch (err) {
    console.log('EROR', err)
    sendResponseError(500, `Error ${err}`, res)
  }
}

const getUser = async (req, res) => {
  res.status(200).send({user: req.user})
}

const saveDeliveryInfo = async (req, res) => {
  const { fullName, phoneNumber, deliveryAddress } = req.body;

  try {
    // Create the delivery information document
    const deliveryInfo = await DeliveryInfo.create({
      userId: req.user._id, // Assuming you have user data in req.user
      fullName,
      phoneNumber,
      deliveryAddress,
    });
      console.log('Delivery Information:', deliveryInfo);
    // Associate the delivery information with the user
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { deliveryInfo: deliveryInfo._id },
      { new: true }
    );
res.status(201).json({ message: 'Delivery information saved successfully' });
  } catch (error) {
    console.error('Error:', error);
    sendResponseError(500, 'Something went wrong while saving delivery information', res);
  }
};


module.exports = {signUpUser, signInUser, getUser, saveDeliveryInfo}
