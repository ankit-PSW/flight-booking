import Seat from '../models/seat.js';


export const createSeat = async (req, res) => {
    try {
        const seat = await Seat.create(req.body);
        console.log("seats", seat);
        res.status(201).json(seat);
    } catch (error) {
            console.log("seat error", error);
        res.status(500).json({ message: error.parent?.detail || error.message });
    }
};


export const getAllSeats = async (req, res) => {
    try {
        const seats = await Seat.findAll();
        res.status(200).json(seats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getSeatById = async (req, res) => {
    try {
        const seat = await Seat.findOne({
            where: { SeatId: req.params.id }
        });

        if (!seat) {
            return res.status(404).json({ message: 'Seat not found' });
        }

        res.status(200).json(seat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateSeatById = async (req, res) => {
    try {
        const seat = await Seat.findOne({
            where: { SeatId: req.params.id }
        });

        if (!seat) {
            return res.status(404).json({ message: 'Seat not found' });
        }

        await seat.update(req.body);
        res.status(200).json(seat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteSeatById = async (req, res) => {
    try {
        const seat = await Seat.findOne({
            where: { SeatId: req.params.id }
        });

        if (!seat) {
            return res.status(404).json({ message: 'Seat not found' });
        }

        await seat.destroy();
        res.status(200).json({ message: 'Seat deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
