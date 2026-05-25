const express = require("express");

const Trip = require("../models/Trip");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE TRIP
router.post("/", authMiddleware, async (req, res) => {

  try {

    const {
      destination,
      startDate,
      endDate,
      budget,
      notes,
    } = req.body;

    const newTrip = new Trip({
      destination,
      startDate,
      endDate,
      budget,
      notes,
      userId: req.user.id,
    });

    await newTrip.save();

    res.status(201).json(newTrip);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// GET ALL TRIPS
router.get("/", authMiddleware, async (req, res) => {

  try {

    const trips = await Trip.find({
      userId: req.user.id,
    });

    res.json(trips);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// UPDATE TRIP
router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTrip);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// DELETE TRIP
router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    await Trip.findByIdAndDelete(req.params.id);

    res.json({
      message: "Trip deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;