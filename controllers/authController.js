const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/users');
const jwt = require('jsonwebtoken');

const authRegister = async (req, res, next) => {

    //First Validate The Request
    // const { error } = validate(req.body);
    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }

    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ status: 'SignUp Failed' });
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            email: req.body.email,
            password: req.body.password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '365 days' },
            (err, token) => {
                if (err) throw err;
                return res.json({ token: token, status: 'success'});
            }
        );
    }
}

// Login User
const authLogin = async (req, res) => {
    // First Validate The HTTP Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //  Now find the user by their email address
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password.');
    }

    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }

    const payload = {
        user: {
            id: user.id,
        },
    };

    const expiresIn = '365 days';

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn }, (err, token) => {
        if (err) throw err;
        res.json({ token });
    });

    res.send(true);
}

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = {
    authLogin,
    authRegister
}