import express from 'express';

import {
    createFlight,
    getAllFlights,
    getFlightById,
    updateFlightById,
    deleteFlightById
} from '../controllers/flight.js';

const router = express.Router();

router.post('/', createFlight);
router.get('/', getAllFlights);
router.get('/:id', getFlightById);
router.put('/:id', updateFlightById);
router.delete('/:id', deleteFlightById);
export default router;
