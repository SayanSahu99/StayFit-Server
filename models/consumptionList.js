const mongoose = require('mongoose');

let food = {
  name: {
      type: String,
      required: true,
  },
  caloriesPerPortion: {
      type: Number,
      min: 1,
      required: true,
  },
  protein: {
      type: Number,
      min: 0,
      required: true,
  },
  carbohydrates: {
      type: Number,
      min: 0,
      required: true,
  },
  fibre: {
      type: Number,
      min: 0,
      required: true,
  },
  fat: {
      type: Number,
      min: 0,
      required: true,
  },
  part: {
      type: String,
      required: true,
      enum: ['breakfast', 'morningSnacks', 'eveningSnacks', 'dinner', 'lunch'],
  },
  quantity: {
    type: Number,
    required: true,
  }
};

let consumptionListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  
  consumptionList: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      breakfast: [
        {
          food: food,
        },
      ],
      morningSnacks: [
        {
          food: food,
        },
      ],
      lunch: [
        {
          food: food,
        },
      ],
      eveningSnacks: [
        {
          food: food,
        },
      ],
      dinner: [
        {
          food: food,
        },
      ],
    }
  ],
})

const consumptionList = mongoose.models.consumptionList || mongoose.model('consumptionList', consumptionListSchema);

exports.consumptionList = consumptionList;