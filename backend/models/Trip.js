const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },

  startDate: {
    type: String,
    required: true,
  },

  endDate: {
    type: String,
    required: true,
  },

  budget: {
    type: Number,
    required: true,
  },

  notes: {
    type: String,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Trip", tripSchema);