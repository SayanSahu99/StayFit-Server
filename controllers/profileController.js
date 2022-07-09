const { validationResult } = require('express-validator');
const { Profile } = require('../models/profile');
const errorLogger = require('../utils/errorLogger')

const getProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = req.user.id;

        console.log("User ID: ", req.user.id);

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
    
    let profile_obj = JSON.parse(JSON.stringify(req.body));
    console.log(profile_obj); 

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = req.user.id;

        let profile = await Profile.findOne({
            user: user
        });

        // We check if the user has a profile, if not, we create it
        if (!profile) {
            let newProfile = req.body;
            newProfile.user = user;
            profile = await Profile.create(newProfile);
            profile.save();
            return res.json({status: "success", msg: "Profile Created"});
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

        return res.json({status: "success", msg: "Profile Updated"});

    } catch (error) {
        errorLogger(req, 1, error);
        res.status(500).json({status: "fail", msg: "Profile Update Failed"});
    }
}

module.exports = {
    getProfile,
    updateProfile
}