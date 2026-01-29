import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Airport = sequelize.define('Airport', {
    AirportId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    AirportName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Aminities: {
      type: DataTypes.STRING,
    }
  },
  {
    tableName: 'Airports',
    timestamps: true,
  }
);

export default Airport;
