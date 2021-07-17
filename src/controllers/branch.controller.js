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
    },
    getBranch: async (req, res) => {
        try {
            const { sucursal } = req.params;
            let branch = await Branch.findOne({
                where: { sucursal: sucursal}
            })
            res.send(branch);
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