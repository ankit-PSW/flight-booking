import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Airline from './airline.js';

const Flight = sequelize.define('Flight', {
    FlightId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    OriginAirport: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Airports',
            key: 'AirportId'
        }
    },
    DestinationAirport: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Airports',
            key: 'AirportId'
        }
    },
    FlightType: {
        type: DataTypes.ENUM('DOMESTIC', 'INTERNATIONAL'),
        allowNull: false
    },
    AirlineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Airline,
            key: 'AirlineId'
        }
    },
    DepartureAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ArrivalAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'Flights',
    timestamps: true,
});

Flight.associate = models => {
    Flight.belongsTo(models.Airline, {
      foreignKey: 'AirlineId',
      as: 'Airline'
    });
    Flight.belongsTo(models.Airport, {
        foreignKey: 'OriginAirport',
        as: 'Origin'
    });
    Flight.belongsTo(models.Airport, {
        foreignKey: 'DestinationAirport',
        as: 'Destination'
    });
};
export default Flight;
