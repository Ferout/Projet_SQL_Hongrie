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
router.get('/events', eventListAction); // Liste de tous les événements
router.get('/events/:ID_events', eventShowAction); // Détails d'un événement
router.post('/events', eventCreateAction); // Créer un événement
router.put('/events/:ID_events', eventUpdateAction); // Mettre à jour un événement
router.delete('/events/:ID_events', eventDeleteAction); // Supprimer un événement

// Routes pour les participations
router.get('/participations', participateListAction);
router.get('/participations/:id', participateShowAction);

// Routes pour les pays
router.get('/countries', countryListAction);
router.get('/countries/:ID_country', countryShowAction);
router.post('/countries', countryCreateAction);
router.put('/countries/:ID_country', countryUpdateAction);
router.delete('/countries/:ID_country', countryDeleteAction);

// Actions pour les athlètes
async function athleteListAction(request, response) {
    var athletes = await athleteRepo.getAllAthletes();
    response.send(JSON.stringify(athletes));
}

async function athleteShowAction(request, response) {
    var athlete = await athleteRepo.getAthleteById(request.params.athleteId);
    response.send(JSON.stringify(athlete));
}

async function athleteCreateAction(request, response) {
    var newAthlete = await athleteRepo.addAthlete(request.body);
    response.send(JSON.stringify(newAthlete));
}

async function athleteUpdateAction(request, response) {
    var updatedAthlete = await athleteRepo.updateAthlete(request.params.athleteId, request.body);
    response.send(JSON.stringify(updatedAthlete));
}

async function athleteDelAction(request, response) {
    var numRows = await athleteRepo.delAthlete(request.params.athleteId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}

// Actions pour les sports
async function sportListAction(request, response) {
    var sports = await sportRepo.getAllSports();
    response.send(sports);
}

async function sportShowAction(request, response) {
    var sport = await sportRepo.getSportById(request.params.ID_sport);
    response.send(sport);
}

async function sportCreateAction(request, response) {
    var newSport = await sportRepo.addSport(request.body);
    response.send(newSport);
}

async function sportUpdateAction(request, response) {
    var updatedSport = await sportRepo.updateSport(request.params.ID_sport, request.body);
    response.send(updatedSport);
}

async function sportDeleteAction(request, response) {
    var numRows = await sportRepo.deleteSport(request.params.ID_sport);
    response.send({ rowsDeleted: numRows });
}

// Actions pour les événements
async function eventListAction(request, response) {
    var events = await eventRepo.getAllEvents();
    response.send(JSON.stringify(events));
}

async function eventShowAction(request, response) {
    var event = await eventRepo.getEventById(request.params.eventId);
    response.send(JSON.stringify(event));
}

async function eventCreateAction(request, response) {
    try {
        const newEvent = await eventRepo.addEvent(request.body);
        response.send({ message: "Event created successfully", eventId: newEvent });
    } catch (err) {
        console.error("Error creating event:", err);
        response.status(500).send({ error: "Error creating event" });
    }
}

async function eventUpdateAction(request, response) {
    try {
        const updatedRows = await eventRepo.updateEvent(request.params.eventId, request.body);
        response.send({ message: "Event updated successfully", rowsUpdated: updatedRows });
    } catch (err) {
        console.error("Error updating event:", err);
        response.status(500).send({ error: "Error updating event" });
    }
}

async function eventDeleteAction(request, response) {
    try {
        const deletedRows = await eventRepo.deleteEvent(request.params.eventId);
        response.send({ message: "Event deleted successfully", rowsDeleted: deletedRows });
    } catch (err) {
        console.error("Error deleting event:", err);
        response.status(500).send({ error: "Error deleting event" });
    }
}

// Actions pour les participations
async function participateListAction(request, response) {
    var participations = await participateRepo.getAllParticipations();
    response.send(JSON.stringify(participations));
}

async function participateShowAction(request, response) {
    var participation = await participateRepo.getParticipationById(request.params.id);
    response.send(JSON.stringify(participation));
}

// Actions pour les pays
async function countryListAction(request, response) {
    var countries = await countryRepo.getAllCountries();
    response.send(JSON.stringify(countries));
}

async function countryShowAction(request, response) {
    var country = await countryRepo.getCountryById(request.params.ID_country);
    response.send(JSON.stringify(country));
}

async function countryCreateAction(request, response) {
    var newCountry = await countryRepo.addCountry(request.body);
    response.send(JSON.stringify(newCountry));
}

async function countryUpdateAction(request, response) {
    var updatedCountry = await countryRepo.updateCountry(request.params.ID_country, request.body);
    response.send(JSON.stringify(updatedCountry));
}

async function countryDeleteAction(request, response) {
    var numRows = await countryRepo.deleteCountry(request.params.ID_country);
    response.send({ rowsDeleted: numRows });
}

module.exports = router;
