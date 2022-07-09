const mongoose = require('mongoose');

const Profile = mongoose.model('Profile', new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    height: {
        type: Number,
        required: true,
        min: 1,
    },
    weight: {
        type: Number,
        required: true,
        min: 1,
    },
    age: {
        type: Number,
        required: true,
        min: 1,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
    },
    activity: {
        type: String,
        required: true,
        enum: ['sedenatry', 'light', 'moderate', 'high'],
    },
    medical: {
        type: String,
        required: true,
        enum: ['diabetes', 'thyroid', 'PCOS', 'cholestrol', 'physical injury', 'hypertension'],
    }
}));

exports.Profile = Profile;