import express from 'express';

import {
  createPassenger,
  getAllPassengers,
  getPassengerById,
  updatePassengerById,
  deletePassengerById
} from '../controllers/passenger.js';

const router = express.Router();

const validatePassenger = (req, res, next) => {
  const { FirstName, Email } = req.body;
  if (!FirstName || !Email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  next();
};

const validatePassengerUpdate = (req, res, next) => {
  const { FirstName, Email } = req.body;
  if ((FirstName && FirstName === '') || (Email && Email === '')) {
    return res.status(400).json({ error: 'FirstName and email cannot be empty' });
  }
  next();
};

router.post('/',validatePassenger,  createPassenger);
router.get('/', getAllPassengers);
router.get('/:id', getPassengerById);
router.put('/:id', validatePassengerUpdate, updatePassengerById);
router.delete('/:id', deletePassengerById);

export default router;
