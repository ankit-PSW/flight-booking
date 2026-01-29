import express from 'express';

import {
  createAirport,
  getAllAirports,
  getAirportById,
  updateAirportById,
  deleteAirportById
} from '../controllers/airport.js';

const router = express.Router();

router.post('/', createAirport);
router.get('/', getAllAirports);
router.get('/:id', getAirportById);
router.put('/:id', updateAirportById);
router.delete('/:id', deleteAirportById);
export default router;
