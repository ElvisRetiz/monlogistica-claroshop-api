const sequelize = require('../db/index');

const Guide = require('../db/models/guide.model');

const controller = {
    getGuides: async (req, res) => {
        try {
            let guides = await Guide.findAll();
            return res.send(guides);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getGuidesByOrder: async (req, res) => {
        try {
            const { orden } = req.params;
            let guides = await Guide.findAll({
                where: { orden: orden }
            });
            return res.send(guides)
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    }
};

module.exports = controller;