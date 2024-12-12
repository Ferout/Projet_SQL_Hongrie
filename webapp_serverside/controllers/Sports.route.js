const express = require('express');
const router = express.Router();
const sportRepo = require('../utils/Sports.repository');

router.get('/', sportListAction);
router.get('/:ID_sport', sportShowAction);
router.post('/', sportCreateAction);
router.put('/:ID_sport', sportUpdateAction);
router.delete('/:ID_sport', sportDeleteAction);


async function sportListAction(request, response) {
    try {
        const sports = await sportRepo.getAllSports();
        response.json(sports);
    } catch (err) {
        console.error("Error fetching sports:", err);
        response.status(500).json({ error: "Error fetching sports" });
    }
}

async function sportShowAction(request, response) {
    try {
        const sport = await sportRepo.getSportById(request.params.ID_sport);
        if (!sport) {
            response.status(404).json({ error: "Sport not found" });
        } else {
            response.json(sport);
        }
    } catch (err) {
        console.error("Error fetching sport:", err);
        response.status(500).json({ error: "Error fetching sport" });
    }
}

async function sportCreateAction(request, response) {
    try {
        const newSport = await sportRepo.addSport(request.body);
        response.status(201).json(newSport);
    } catch (err) {
        console.error("Error creating sport:", err);
        response.status(500).json({ error: "Error creating sport" });
    }
}

async function sportUpdateAction(request, response) {
    try {
        const updatedSport = await sportRepo.updateSport(request.params.ID_sport, request.body);
        if (updatedSport) {
            response.json({ message: "Sport updated successfully" });
        } else {
            response.status(404).json({ error: "Sport not found" });
        }
    } catch (err) {
        console.error("Error updating sport:", err);
        response.status(500).json({ error: "Error updating sport" });
    }
}

async function sportDeleteAction(request, response) {
    try {
        const numRows = await sportRepo.deleteSport(request.params.ID_sport);
        if (numRows > 0) {
            response.json({ message: "Sport deleted successfully" });
        } else {
            response.status(404).json({ error: "Sport not found" });
        }
    } catch (err) {
        console.error("Error deleting sport:", err);
        response.status(500).json({ error: "Error deleting sport" });
    }
}

module.exports = router;