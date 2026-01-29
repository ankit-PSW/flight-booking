import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Flight from './flight.js';

const FareClass = sequelize.define(
  'FareClass',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    FlightId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Flight,
        key: 'FlightId'
      }
    },
    ClassCode: {
      type: DataTypes.ENUM('ECONOMY', 'BUSINESS', 'FIRST'),
      allowNull: false
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    BaggagePolicy: {
      type: DataTypes.STRING
    },
  },
  {
    tableName: 'FareClasses',
    timestamps: true,
    indexes: [
      { unique: true, fields: ['FlightId', 'ClassCode'] }
    ]
  }
);

export default FareClass;
