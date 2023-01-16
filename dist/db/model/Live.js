"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = (sequelize, DataTypes) => {
  return sequelize.define('Live', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
  });
};
exports.default = _default;