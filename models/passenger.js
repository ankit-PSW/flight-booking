import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Passenger = sequelize.define('Passenger', {
    PassengerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MiddleName: {
        type: DataTypes.STRING,
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Gender: {
        type: DataTypes.ENUM('MALE', 'FEMALE', 'OTHER'),
        allowNull: false
    },
    Age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Please provide a valid email address'
            }
      }
    },
    ContactNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Passengers',
    timestamps: true,
});

export default Passenger;