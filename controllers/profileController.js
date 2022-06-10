const { validationResult } = require('express-validator');
const { Profile } = require('../models/profile');
const errorLogger = require('../utils/errorLogger')

const getProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = '62a22884eb0450a95f5413df';

        let list = await Profile.findOne({
            user: user
        });

        // We check if the user has a profile
        if (!list) {
            return res.status(500).send('No Profile');
        }

        res.json(list);
    } catch (error) {
        errorLogger(req, 1, error);
        res.status(500).send('Server error');
    }

}

const updateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = '62a22884eb0450a95f5413df';

        let profile = await Profile.findOne({
            user: user
        });

        // We check if the user has a profile, if not, we create it
        if (!profile) {
            let newProfile = req.body;
            newProfile.user = user;
            profile = await Profile.create(newProfile);
            profile.save();
            return res.send("Profile Created");
        }

        else {
            profile.name = req.body.name;
            profile.weight = req.body.weight;
            profile.height = req.body.height;
            profile.gender = req.body.gender;
            profile.age = req.body.age;
            profile.activity = req.body.activity;
            profile.medical = req.body.medical;
            await profile.save();
        }

        return res.json('Profile has been updated');

    } catch (error) {
        errorLogger(req, 1, error);
        res.status(500).send('Server error');
    }
}

module.exports = {
    getProfile,
    updateProfile
}