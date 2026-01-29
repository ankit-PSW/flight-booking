import express from 'express';

import {
    createBooking,
    getAllBookings,
    // getBookingById,
    // updateBookingById,
    // deleteBookingById
} from '../controllers/booking.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/', getAllBookings);
// router.get('/:id', getBookingById);
// router.put('/:id', updateBookingById);
// router.delete('/:id', deleteBookingById);

export default router;
