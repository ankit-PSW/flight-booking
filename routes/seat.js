import express from 'express';

import {
    createSeat,
    getAllSeats,
    getSeatById,
    updateSeatById,
    deleteSeatById
} from '../controllers/seat.js'; // Adjust the path if necessary

const router = express.Router();

router.post('/', createSeat);
router.get('/', getAllSeats);
router.get('/:id', getSeatById);
router.put('/:id', updateSeatById);
router.delete('/:id', deleteSeatById);

export default router;
