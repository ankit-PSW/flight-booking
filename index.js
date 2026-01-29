import express from 'express';
import dotenv from 'dotenv';
import db from './models/index.js';
import passengerRoutes from './routes/passenger.js';
import airportRoutes from './routes/airport.js';
import airlineRoutes from './routes/airline.js';
import flightRoutes from './routes/flight.js';
import fareClassRoutes from './routes/fareClass.js';
import errorHandler from './middleware/error.js';
import seatRoutes from './routes/seat.js';
import bookingRoutes from './routes/booking.js';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);

app.use('/api/passengers', passengerRoutes);
app.use('/api/airports', airportRoutes);
app.use('/api/airlines', airlineRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/fare-classes', fareClassRoutes);
app.use('/api/seats', seatRoutes);
app.use('/api/bookings', bookingRoutes);


(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected');

    await db.sequelize.sync({ alter: true });
    console.log('Models synchronized');

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Startup error:', error);
  }
})();


