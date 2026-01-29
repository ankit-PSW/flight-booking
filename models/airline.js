import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Airline = sequelize.define('Airline', {
    AirlineId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    AirlineName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    ContactNumber: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'Airlines',
    timestamps: true,
  }
);

export default Airline;
