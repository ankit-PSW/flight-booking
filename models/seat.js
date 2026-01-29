// models/Seat.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import FareClass from './fareClass.js';

const Seat = sequelize.define(
  'Seat',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    FlightId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FareClassId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
            model: FareClass,
            key: 'id'
        }
    },
    SeatNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Status: {
      type: DataTypes.ENUM('AVAILABLE', 'LOCKED', 'BOOKED'),
      defaultValue: 'AVAILABLE'
    }
  },
  {
    tableName: 'Seats',
    timestamps: true,
    indexes: [
      { unique: true, fields: ['FlightId', 'SeatNumber'] }
    ]
  }
);

export default Seat;
