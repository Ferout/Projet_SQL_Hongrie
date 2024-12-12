const express = require('express');
const router = express.Router();
const participateRepo = require('../utils/Participate.repository');


router.get('/', participateListAction);
router.post('/', participateCreateAction);
router.put('/:athlete_id/:event_id', participateUpdateAction);
router.delete('/:athlete_id/:event_id', participateDeleteAction);


async function participateListAction(request, response) {
    try {
        const participations = await participateRepo.getAllParticipations();
        response.json(participations);
    } catch (err) {
        console.error("Error fetching participations:", err);
        response.status(500).json({ error: "Error fetching participations" });
    }
}

async function participateCreateAction(request, response) {
    try {
        const newParticipation = await participateRepo.addParticipation(request.body);
        response.status(201).json({
            message: "Participation created successfully",
            participation: newParticipation,
        });
    } catch (err) {
        console.error("Error creating participation:", err);
        response.status(500).json({ error: "Error creating participation" });
    }
}

async function participateUpdateAction(request, response) {
    try {
        const { athlete_id, event_id } = request.params;
        const result = await participateRepo.updateParticipation(
            { athlete_id: parseInt(athlete_id), event_id: parseInt(event_id) },
            request.body
        );

        if (result.success) {
            response.json({ message: "Participation updated successfully" });
        } else {
            response.status(404).json({ error: "Participation not found" });
        }
    } catch (err) {
        console.error("Error updating participation:", err);
        response.status(500).json({ error: "Error updating participation" });
    }
}

async function participateDeleteAction(request, response) {
    try {
        const { athlete_id, event_id } = request.params;
        const result = await participateRepo.deleteParticipation({
            athlete_id: parseInt(athlete_id),
            event_id: parseInt(event_id),
        });

        if (result.success) {
            response.json({ message: "Participation deleted successfully" });
        } else {
            response.status(404).json({ error: "Participation not found" });
        }
    } catch (err) {
        console.error("Error deleting participation:", err);
        response.status(500).json({ error: "Error deleting participation" });
    }
}

module.exports = router;
