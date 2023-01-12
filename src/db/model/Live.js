export default (sequelize, DataTypes) => {
    return sequelize.define('Live', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      // Other model options go here
    });
  };