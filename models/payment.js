import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Booking from './booking.js';

const Payment = sequelize.define( 'Payment', {
    PaymentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    BookingID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Booking,
        key: 'BookingId'
      },
      onDelete: 'CASCADE'
    },
    PaymentMethod: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    TransactionDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: 'Payments',
    timestamps: true
  }
);

export default Payment;