import Airline from '../models/airline.js';
import Flight from '../models/flight.js';
import Airport from '../models/airport.js';
import { Op } from 'sequelize';

export const createFlight = async (req, res) => {
    try {
        const flight = await Flight.create(req.body);
        res.status(201).json(flight);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllFlights = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const { search, origin, destination, date } = req.query;

    const where = {};
    if (search) {
        where[Op.or] = [
            // { FlightId: search },
            // { OriginAirport: search },
            // { DestinationAirport: search },
            { FlightType: search },
        ];
    }
    if (origin) where.OriginAirport = origin;
    if (destination) where.DestinationAirport = destination;
    if (date) {
        const dateObj = new Date(date);
        where.DepartureDateTime = {
            [Op.gte]: dateObj,
            [Op.lt]: new Date(dateObj.getTime() + 24 * 60 * 60 * 1000),
        };
    }

    try {
        const { count, rows: flights } = await Flight.findAndCountAll({
            where,
            include: [
                {
                    model: Airline,
                    as: 'Airline',
                    attributes: ['AirlineId', 'AirlineName']
                },
                {
                    model: Airport,
                    as: 'Origin',
                    attributes: ['AirportId', 'AirportName', 'Location']
                },
                {
                    model: Airport,
                    as: 'Destination',
                    attributes: ['AirportId', 'AirportName', 'Location']
                }
            ],
            limit,
            offset: (page - 1) * limit,
        });
        res.status(200).json({
            flights,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFlightById = async (req, res) => {
    try {
        const flight = await Flight.findByPk(req.params.id);
        if (!flight) return res.status(404).json({ message: 'Flight not found' });
        res.status(200).json(flight);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateFlightById = async (req, res) => {
    try {
        const flight = await Flight.findByPk(req.params.id);
        if (!flight) return res.status(404).json({ message: 'Flight not found' });
        await flight.update(req.body);
        res.status(200).json(flight);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteFlightById = async (req, res) => {
    try {
        const flight = await Flight.findByPk(req.params.id);
        if (!flight) return res.status(404).json({ message: 'Flight not found' });
        await flight.destroy();
        res.status(200).json({ message: 'Flight deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
