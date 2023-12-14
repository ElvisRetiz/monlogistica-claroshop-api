const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Guide extends Model {};

Guide.init({
    orden: {
        type: DataTypes.INTEGER,
        allowNull: true
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
	fechaDevueltaAlmacen: {
        type: DataTypes.DATE,
        allowNull: true
    },
    posicion: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    telefono: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    numeroPedido: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    referencias: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    fotoOtro: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    ancho: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    largo: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    alto: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    descripcionPaquete: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    cliente: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    sucursal: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    peso: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    fechaEnvio: {
        type: DataTypes.DATE,
        allowNull: true
    },
},{
    sequelize,
    modelName: 'Guide',
    tableName: 'OrdenesRecoleccionGuias',
    timestamps: false
});

module.exports = Guide;