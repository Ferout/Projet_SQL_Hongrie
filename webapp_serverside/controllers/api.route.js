const express = require('express');
const router = express.Router();
const athleteRepo = require('../utils/Athletes.repository');
const sportRepo = require('../utils/Sports.repository');
const eventRepo = require('../utils/Events.repository');
const participateRepo = require('../utils/Participate.repository');
const countryRepo = require('../utils/Countries.repository');

// Routes pour les athlètes
router.get('/athletes', athleteListAction);
router.get('/athletes/:athleteId', athleteShowAction);
router.post('/athletes', athleteCreateAction);
router.put('/athletes/:athleteId', athleteUpdateAction);
router.delete('/athletes/:athleteId', athleteDelAction);

// Routes pour les sports
router.get('/sports', sportListAction);
router.get('/sports/:ID_sport', sportShowAction);
router.post('/sports', sportCreateAction);
router.put('/sports/:ID_sport', sportUpdateAction);
router.delete('/sports/:ID_sport', sportDeleteAction);

// Routes pour les événements
router.get('/events', eventListAction);
router.get('/events/:ID_events', eventShowAction);
router.post('/events', eventCreateAction);
router.put('/events/:ID_events', eventUpdateAction);
router.delete('/events/:ID_events', eventDeleteAction);

// Routes pour les participations
router.get('/participations', participateListAction);
router.get('/participations/:id', participateShowAction);
router.post('/participations', participateCreateAction);
router.put('/participations/:id', participateUpdateAction);
router.delete('/participations/:id', participateDeleteAction);

// Routes pour les pays
router.get('/countries', countryListAction);
router.get('/countries/:ID_country', countryShowAction);
router.post('/countries', countryCreateAction);
router.put('/countries/:ID_country', countryUpdateAction);
router.delete('/countries/:ID_country', countryDeleteAction);

// Actions for athletes
async function athleteListAction(request, response) {
    const athletes = await athleteRepo.getAllAthletes();
    response.send(JSON.stringify(athletes));
}

async function athleteShowAction(request, response) {
    const athlete = await athleteRepo.getAthleteById(request.params.athleteId);
    response.send(JSON.stringify(athlete));
}

async function athleteCreateAction(request, response) {
    const newAthlete = await athleteRepo.addAthlete(request.body);
    response.send(JSON.stringify(newAthlete));
}

async function athleteUpdateAction(request, response) {
    const updatedAthlete = await athleteRepo.updateAthlete(request.params.athleteId, request.body);
    response.send(JSON.stringify(updatedAthlete));
}

async function athleteDelAction(request, response) {
    const numRows = await athleteRepo.delAthlete(request.params.athleteId);
    response.send({ rowsDeleted: numRows });
}

// Actions for sports
async function sportListAction(request, response) {
    const sports = await sportRepo.getAllSports();
    response.send(sports);
}

async function sportShowAction(request, response) {
    const sport = await sportRepo.getSportById(request.params.ID_sport);
    response.send(sport);
}

async function sportCreateAction(request, response) {
    const newSport = await sportRepo.addSport(request.body);
    response.send(newSport);
}

async function sportUpdateAction(request, response) {
    const updatedSport = await sportRepo.updateSport(request.params.ID_sport, request.body);
    response.send(updatedSport);
}

async function sportDeleteAction(request, response) {
    const numRows = await sportRepo.deleteSport(request.params.ID_sport);
    response.send({ rowsDeleted: numRows });
}

// Actions for events
async function eventListAction(request, response) {
    const events = await eventRepo.getAllEvents();
    response.send(JSON.stringify(events));
}

async function eventShowAction(request, response) {
    const event = await eventRepo.getEventById(request.params.ID_events);
    response.send(JSON.stringify(event));
}

async function eventCreateAction(request, response) {
    try {
        const newEvent = await eventRepo.addEvent(request.body);
        response.send({ message: "Event created successfully", ID_events: newEvent });
    } catch (err) {
        console.error("Error creating event:", err);
        response.status(500).send({ error: "Error creating event" });
    }
}

async function eventUpdateAction(request, response) {
    try {
        const updatedRows = await eventRepo.updateEvent(request.params.ID_events, request.body);
        response.send({ message: "Event updated successfully", rowsUpdated: updatedRows });
    } catch (err) {
        console.error("Error updating event:", err);
        response.status(500).send({ error: "Error updating event" });
    }
}

async function eventDeleteAction(request, response) {
    try {
        const deletedRows = await eventRepo.deleteEvent(request.params.ID_events);
        response.send({ message: "Event deleted successfully", rowsDeleted: deletedRows });
    } catch (err) {
        console.error("Error deleting event:", err);
        response.status(500).send({ error: "Error deleting event" });
    }
}

// Actions for participations
async function participateListAction(request, response) {
    try {
        const participations = await participateRepo.getAllParticipations();
        response.send(JSON.stringify(participations));
    } catch (err) {
        console.error("Error fetching participations:", err);
        response.status(500).send({ error: "Error fetching participations" });
    }
}

async function participateShowAction(request, response) {
    try {
        const participation = await participateRepo.getParticipationById(request.params.id);
        response.send(JSON.stringify(participation));
    } catch (err) {
        console.error("Error fetching participation:", err);
        response.status(500).send({ error: "Error fetching participation" });
    }
}

async function participateCreateAction(request, response) {
    try {
        const newParticipation = await participateRepo.addParticipation(request.body);
        response.status(201).send({
            message: "Participation created successfully",
            participation: newParticipation
        });
    } catch (err) {
        console.error("Error creating participation:", err);
        response.status(500).send({ error: "Error creating participation" });
    }
}

async function participateUpdateAction(request, response) {
    try {
        const updatedRows = await participateRepo.updateParticipation(request.params.id, request.body);
        if (updatedRows) {
            response.send({
                message: "Participation updated successfully",
                rowsUpdated: updatedRows
            });
        } else {
            response.status(404).send({ error: "Participation not found" });
        }
    } catch (err) {
        console.error("Error updating participation:", err);
        response.status(500).send({ error: "Error updating participation" });
    }
}

async function participateDeleteAction(request, response) {
    try {
        const deletedRows = await participateRepo.deleteParticipation(request.params.id);
        if (deletedRows) {
            response.send({
                message: "Participation deleted successfully",
                rowsDeleted: deletedRows
            });
        } else {
            response.status(404).send({ error: "Participation not found" });
        }
    } catch (err) {
        console.error("Error deleting participation:", err);
        response.status(500).send({ error: "Error deleting participation" });
    }
}

// Actions for countries
async function countryListAction(request, response) {
    const countries = await countryRepo.getAllCountries();
    response.send(JSON.stringify(countries));
}

async function countryShowAction(request, response) {
    const country = await countryRepo.getCountryById(request.params.ID_country);
    response.send(JSON.stringify(country));
}

async function countryCreateAction(request, response) {
    const newCountry = await countryRepo.addCountry(request.body);
    response.send(JSON.stringify(newCountry));
}

async function countryUpdateAction(request, response) {
    const updatedCountry = await countryRepo.updateCountry(request.params.ID_country, request.body);
    response.send(JSON.stringify(updatedCountry));
}

async function countryDeleteAction(request, response) {
    const numRows = await countryRepo.deleteCountry(request.params.ID_country);
    response.send({ rowsDeleted: numRows });
}

module.exports = router;
