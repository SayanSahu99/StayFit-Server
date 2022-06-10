const { json } = require('body-parser');
const endOfDay = require('date-fns/endOfDay');
const startOfDay = require('date-fns/startOfDay');
const { validationResult } = require('express-validator');
const { consumptionList } = require('../models/consumptionList');
const errorLogger = require('../utils/errorLogger')

const getConsumptionList = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = '62a22884eb0450a95f5413df';

        let list = await consumptionList.findOne({
            user: user
        });

        // We check if the user has a consumption list, if not, we create it
        if (!list) {
            res.status(500).send('No consumption list');
        }

        res.json(list);
    } catch (error) {
        errorLogger(req, 1, error);
        res.status(500).send('Server error');
    }

}

const getConsumptionListByDate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let date = new Date(req.params.date_string);
        let user = '62a22884eb0450a95f5413df';

        let list = await consumptionList.findOne(
            {
                user: user,
                "consumptionList.date": date
            }
        );

        // We check if the user has a consumption list, if not, we create it
        if (!list) {
            res.status(500).send('No consumption list');
        }

        // Get the list of food for that day
        list = list.consumptionList.filter(element => {
            return element.date.toISOString() === date.toISOString();
        });

        //console.log(list);

        res.json(list);
    } catch (error) {
        errorLogger(req, 1, error);
        res.status(500).send('Server error');
    }

}

const updateConsumptionList = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const body = req.body;
        let date = new Date(req.body.date);
        let user = '62a22884eb0450a95f5413df';

        // Check if user exists
        let list = await consumptionList.findOne({
            user: user
        });

        // User consumptionList doesn't exost, we create it
        if (!list) {
            
            list = new consumptionList({
                user: user
            });
    
            body.consumptionList[0].date = date;
            list.consumptionList = body.consumptionList;
            await list.save();

            res.json('Consumption List has been updated');
        }

        else {
            let list = await consumptionList.findOne({
                user: user,
                "consumptionList.date": {
                    $gte: startOfDay(date),
                    $lte: endOfDay(date)
                }
            });

            if (list) {
        
                list.consumptionList = body.consumptionList;
                await list.save();
                res.json('Consumption List has been updated (Same Day)');
            }

            else {
        
                body.consumptionList[0].date = date;
                await consumptionList.findOneAndUpdate({
                    user: user
                }, { $push: { consumptionList: body.consumptionList } });
                res.json('Consumption List has been updated (Different Date)');
            }
        }


    } catch (error) {
        errorLogger(req, 1, error);
        res.status(500).send('Server error');
    }
}

module.exports = {
    updateConsumptionList,
    getConsumptionList,
    getConsumptionListByDate
}