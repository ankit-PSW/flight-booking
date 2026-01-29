import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Passenger from './passenger.js';
import Flight from './flight.js';
import Seat from './seat.js';


const Booking = sequelize.define(
  'Booking',
  {
    BookingId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true
    },
    PassengerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Passenger,
        key: 'PassengerId'
      }
    },
    FlightId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Flight,
        key: 'FlightId'
      }
    },
    SeatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Seat,
        key: 'id'
      }
    },
    BookingDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Status: {
      type: DataTypes.ENUM('CONFIRMED', 'CANCELLED'),
      allowNull: false
    }
  },
  {
    tableName: 'Bookings',
    timestamps: true,
  }
);

export default Booking;
