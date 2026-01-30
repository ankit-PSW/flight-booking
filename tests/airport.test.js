import Airport from '../models/airport.js';
import * as airportController from '../controllers/airport.js';

jest.mock('../models/airport.js');

describe("Airport Test Suite", () => {

    describe("createAirport", () => {
        test("should create airport and return 201 status", async () => {
            const mockAirport = { AirportId: 1, AirportName: "JFK" };
            Airport.create.mockResolvedValue(mockAirport);
            const req = { body: { AirportName: "JFK" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            
            await airportController.createAirport(req, res);
            
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockAirport);
        });

        test("should return 500 on creation error", async () => {
            Airport.create.mockRejectedValue(new Error("DB error"));
            const req = { body: { AirportName: "JFK" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            
            await airportController.createAirport(req, res);
            
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });

    describe("getAllAirports", () => {
        test("should return all airports with 200 status", async () => {
            const mockAirports = [{ AirportId: 1, AirportName: "JFK" }, { AirportId: 2, AirportName: "LAX" }];
            Airport.findAll.mockResolvedValue(mockAirports);
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            
            await airportController.getAllAirports(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockAirports);
        });
    });

    describe("getAirportById", () => {
        test("should return airport by id", async () => {
            const mockAirport = { AirportId: 1, AirportName: "JFK" };
            Airport.findOne.mockResolvedValue(mockAirport);
            const req = { params: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            
            await airportController.getAirportById(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockAirport);
        });

        test("should return 404 when airport not found", async () => {
            Airport.findOne.mockResolvedValue(null);
            const req = { params: { id: 999 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            
            await airportController.getAirportById(req, res);
            
            expect(res.status).toHaveBeenCalledWith(404);
        });
    });

    describe("updateAirportById", () => {
        test("should update airport successfully", async () => {
            const mockAirport = { AirportId: 1, AirportName: "JFK", update: jest.fn().mockResolvedValue() };
            Airport.findOne.mockResolvedValue(mockAirport);
            const req = { params: { id: 1 }, body: { AirportName: "JFK Updated" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            
            await airportController.updateAirportById(req, res);
            
            expect(mockAirport.update).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("should return 404 when airport not found for update", async () => {
            Airport.findOne.mockResolvedValue(null);
            const req = { params: { id: 999 }, body: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            
            await airportController.updateAirportById(req, res);
            
            expect(res.status).toHaveBeenCalledWith(404);
        });
    });

    describe("deleteAirportById", () => {
        test("should delete airport successfully", async () => {
            const mockAirport = { AirportId: 1, destroy: jest.fn().mockResolvedValue() };
            Airport.findOne.mockResolvedValue(mockAirport);
            const req = { params: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            
            await airportController.deleteAirportById(req, res);
            
            expect(mockAirport.destroy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("should return 404 when airport not found for deletion", async () => {
            Airport.findOne.mockResolvedValue(null);
            const req = { params: { id: 999 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            
            await airportController.deleteAirportById(req, res);
            
            expect(res.status).toHaveBeenCalledWith(404);
        });
    });
});