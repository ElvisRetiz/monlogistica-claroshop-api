const sequelize = require('../db/index');

const Branch = require('../db/models/branch.model');

const controller = {
    getBranches: async (req, res) => {
        try {
            let branches = await Branch.findAll();
            return res.send(branches);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            })
        }
    }
};

module.exports = controller;