import Booking from '../models/booking.js';
import Passenger from '../models/passenger.js';
import Flight from '../models/flight.js';
import Seat from '../models/seat.js';


export const createBooking = async (req, res) => {
    try {
        // Better option would be use redis with TTL for locking mechanism
        const { SeatId } = req.body;
        
        await Seat.update(
            { Status: 'LOCKED' },
            { where: { id: SeatId, Status: 'AVAILABLE' }  }
        );
        
        setTimeout(() => {
            Seat.update(
                { Status: 'AVAILABLE' },
                { where: { id: SeatId, Status: 'LOCKED' }  }
            );
        }, 5 * 60 * 1000);
        // const booking = await Booking.create(req.body);
        res.status(201).json(req.body);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllBookings = async (req, res) => {
    const { page = 1, limit = 10, passenger, flight, status } = req.query;

    const where = {};
    if (passenger) where.PassengerID = passenger;
    if (flight) where.FlightID = flight;
    if (status) where.PaymentStatus = status;

    try {
        const { count, rows } = await Booking.findAndCountAll({
            where,
            include: [
                { model: Passenger, attributes: ['PassengerID', 'Name', 'Email'] },
                { model: Flight, attributes: ['FlightID', 'FlightNumber', 'Airline'] }
            ],
            limit: parseInt(limit),
            offset: (parseInt(page) - 1) * parseInt(limit)
        });

        res.status(200).json({
            bookings: rows,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};