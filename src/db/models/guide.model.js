const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Guide extends Model {};

Guide.init({
    orden: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    guia: {
        type: DataTypes.CHAR,
        allowNull: false,
        primaryKey: true
    },
    estatus: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    fechaRecoleccion: {
        type: DataTypes.DATE,
        allowNull: true
    },
	nombreClienteFinal: {
        type: DataTypes.CHAR,
        allowNull: true
    },
	direccion: {
        type: DataTypes.CHAR,
        allowNull: true
    },
	numeroExt: {
        type: DataTypes.CHAR,
        allowNull: true
    },
	numeroInt: {
        type: DataTypes.CHAR,
        allowNull: true
    },
	colonia: {
        type: DataTypes.CHAR,
        allowNull: true
    },
	ciudad: {
        type: DataTypes.CHAR,
        allowNull: true
    },
	estado: {
        type: DataTypes.CHAR,
        allowNull: true
    },
	codigoPostal: {
        type: DataTypes.CHAR,
        allowNull: true
    },
	fechaEntregaAlmacen: {
        type: DataTypes.DATE,
        allowNull: true
    },
	choferEntrega: {
        type: DataTypes.CHAR,
        allowNull: true
    },
	FechaEntregaChofer: {
        type: DataTypes.DATE,
        allowNull: true
    },
	RecibeFecha: {
        type: DataTypes.DATE,
        allowNull: true
    },
	RecibePersona: {
        type: DataTypes.CHAR,
        allowNull: true
    },
	fotoIfe: {
        type: DataTypes.BLOB,
        allowNull: true
    },
	fotoCasa: {
        type: DataTypes.BLOB,
        allowNull: true
    },
	devueltaAlmacen: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
},{
    sequelize,
    modelName: 'Guide',
    tableName: 'OrdenesRecoleccionGuias',
    timestamps: false
});

module.exports = Guide;