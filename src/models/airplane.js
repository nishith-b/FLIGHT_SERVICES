"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airplanes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Airplanes.init(
    {
      modelNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Airplanes",
    }
  );
  return Airplanes;
};
