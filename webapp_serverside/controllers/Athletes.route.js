const express = require('express');
const router = express.Router();
const athleteRepo = require('../utils/Athletes.repository');


router.get('/', athleteListAction); // Correspond à /athletes
router.get('/:athleteId', athleteShowAction); // Correspond à /athletes/:athleteId
router.post('/', athleteCreateAction); // Correspond à /athletes
router.put('/:athleteId', athleteUpdateAction); // Correspond à /athletes/:athleteId
router.delete('/:athleteId', athleteDelAction); // Correspond à /athletes/:athleteId



async function athleteListAction(request, response) {
    try {
        const athletes = await athleteRepo.getAllAthletes();
        response.json(athletes);
    } catch (err) {
        console.error("Error fetching athletes:", err);
        response.status(500).json({ error: "Error fetching athletes" });
    }
}

async function athleteShowAction(request, response) {
    try {
        const athlete = await athleteRepo.getAthleteById(request.params.athleteId);
        if (!athlete) {
            response.status(404).json({ error: "Athlete not found" });
        } else {
            response.json(athlete);
        }
    } catch (err) {
        console.error("Error fetching athlete:", err);
        response.status(500).json({ error: "Error fetching athlete" });
    }
}

async function athleteCreateAction(request, response) {
    try {
        const newAthlete = await athleteRepo.addAthlete(request.body);
        response.status(201).json(newAthlete);
    } catch (err) {
        console.error("Error creating athlete:", err);
        response.status(500).json({ error: "Error creating athlete" });
    }
}

async function athleteUpdateAction(request, response) {
    try {
        const updatedAthlete = await athleteRepo.updateAthlete(request.params.athleteId, request.body);
        response.json(updatedAthlete);
    } catch (err) {
        console.error("Error updating athlete:", err);
        response.status(500).json({ error: "Error updating athlete" });
    }
}

async function athleteDelAction(request, response) {
    try {
        const numRows = await athleteRepo.delAthlete(request.params.athleteId);
        response.json({ rowsDeleted: numRows });
    } catch (err) {
        console.error("Error deleting athlete:", err);
        response.status(500).json({ error: "Error deleting athlete" });
    }
}

module.exports = router;