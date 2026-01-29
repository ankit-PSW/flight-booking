import express from 'express';

import {
  createAirline,
  getAllAirlines,
  getAirlineById,
  updateAirlineById,
  deleteAirlineById
} from '../controllers/airline.js';

const router = express.Router();

router.post('/', createAirline);
router.get('/', getAllAirlines);
router.get('/:id', getAirlineById);
router.put('/:id', updateAirlineById);
router.delete('/:id', deleteAirlineById);

export default router;