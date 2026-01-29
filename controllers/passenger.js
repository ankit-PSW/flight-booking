import Passenger from '../models/passenger.js';

export const createPassenger = async (req, res) => {
  try {
    const passenger = await Passenger.create(req.body);
    res.status(201).json(passenger);
  } catch (error) {
    console.log("catch error", error.parent?.detail)
    res.status(500).json({ message:  error.parent?.detail || error.message });
  }
};


export const getAllPassengers = async (req, res) => {
  try {
    const passengers = await Passenger.findAll();
    res.status(200).json(passengers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getPassengerById = async (req, res) => {
  try {
    const passenger = await Passenger.findByPk(req.params.id);
    if (!passenger) {
      return res.status(404).json({ message: 'Passenger not found' });
    }
    res.status(200).json(passenger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updatePassengerById = async (req, res) => {
  try {
    const passenger = await Passenger.findByPk(req.params.id);

    if (!passenger) {
      return res.status(404).json({ message: 'Passenger not found' });
    }

    await passenger.update(req.body);
    res.status(200).json(passenger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deletePassengerById = async (req, res) => {
  try {
    const passenger = await Passenger.findByPk(req.params.id);

    if (!passenger) {
      return res.status(404).json({ message: 'Passenger not found' });
    }

    await passenger.destroy();
    res.status(200).json({ message: 'Passenger deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
