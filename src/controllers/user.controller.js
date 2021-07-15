const Sequelize = require('sequelize');

const User = require('../db/models/user.model');

const controller = {
    getUsers: async (req,res) => {
        try {
            let users = await User.findAll();
            return res.send(users)
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            })
        }
    }
}

module.exports = controller;