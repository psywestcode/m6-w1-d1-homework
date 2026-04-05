const mongoose = require('mongoose');
const Inventory = require('../models/inventory.model');

exports.createInventory = async (req, res) => {
  try {
    const inventory = new Inventory({
      prodname: req.body.prodname,
      qty: req.body.qty,
      price: req.body.price,
      status: req.body.status
    });

    const data = await inventory.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: 'Fail!',
      error: err.message
    });
  }
};

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).send({
      message: 'Error retrieving inventory with id ' + req.params.id,
      error: err.message
    });
  }
};

exports.inventories = async (req, res) => {
  try {
    const inventoryInfos = await Inventory.find({});
    res.status(200).json(inventoryInfos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error!',
      error: error.message
    });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndRemove(req.params.id);

    if (!inventory) {
      return res.status(404).json({
        message: 'No inventory found with id = ' + req.params.id,
        error: '404'
      });
    }

    res.status(200).json({});
  } catch (err) {
    return res.status(500).send({
      message: "Error -> Can't delete inventory with id = " + req.params.id,
      error: err.message
    });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(
      req.body._id,
      {
        prodname: req.body.prodname,
        qty: req.body.qty,
        price: req.body.price,
        status: req.body.status
      },
      { new: false }
    );

    if (!inventory) {
      return res.status(404).send({
        message: "Error -> Can't update an inventory with id = " + req.body._id,
        error: 'Not Found'
      });
    }

    res.status(200).json(inventory);
  } catch (err) {
    return res.status(500).send({
      message: "Error -> Can't update an inventory with id = " + req.body._id,
      error: err.message
    });
  }
};