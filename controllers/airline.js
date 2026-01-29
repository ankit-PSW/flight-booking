import Airline from '../models/airline.js';


export const createAirline = async (req, res) => {
  try {
    const airline = await Airline.create(req.body);
    console.log("airlines", airline);
    res.status(201).json(airline);
  } catch (error) {
      console.log("airline error", error);
    res.status(500).json({ message: error.parent?.detail || error.message });
  }
};


export const getAllAirlines = async (req, res) => {
  try {
    const airlines = await Airline.findAll();
    res.status(200).json(airlines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAirlineById = async (req, res) => {
  try {
    const airline = await Airline.findOne({
      where: { AirlineId: req.params.id }
    });

    if (!airline) {
      return res.status(404).json({ message: 'Airline not found' });
    }

    res.status(200).json(airline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateAirlineById = async (req, res) => {
  try {
    const airline = await Airline.findOne({
      where: { AirlineId: req.params.id }
    });

    if (!airline) {
      return res.status(404).json({ message: 'Airline not found' });
    }

    await airline.update(req.body);
    res.status(200).json(airline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteAirlineById = async (req, res) => {
  try {
    const airline = await Airline.findOne({
      where: { AirlineId: req.params.id }
    });

    if (!airline) {
      return res.status(404).json({ message: 'Airline not found' });
    }

    await airline.destroy();
    res.status(200).json({ message: 'Airline deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
