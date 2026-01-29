import sequelize from '../config/database.js';

import Airline from './airline.js';
import Airport from './airport.js';
import Booking from './booking.js';
import FareClass from './fareClass.js';
import Flight from './flight.js';
import Passenger from './passenger.js';
import Payment from './payment.js';
import Seat from './seat.js';

const db = {
  sequelize,
  Airport,
  Airline,
  Booking,
  Flight,
  Passenger,
  Payment,
  FareClass,
  Seat,
};

Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;