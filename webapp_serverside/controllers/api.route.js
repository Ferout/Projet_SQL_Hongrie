// controllers/api.route.js
const express = require('express');
const router = express.Router();
const athleteRepo = require('../utils/Athletes.repository');
const sportRepo = require('../utils/Sports.repository');
const eventRepo = require('../utils/events.repository');
const participateRepo = require('../utils/Participate.repository');
const countryRepo = require('../utils/Countries.repository');

// Routes pour les athlètes
router.get('/athletes', athleteListAction);           // Liste de tous les athlètes
router.get('/athletes/:athleteId', athleteShowAction); // Détails d'un athlète
router.post('/athletes', athleteCreateAction);        // Créer un athlète
router.put('/athletes/:athleteId', athleteUpdateAction);  // Mettre à jour un athlète
router.delete('/athletes/:athleteId', athleteDelAction); // Supprimer un athlète

// Routes pour les sports
router.get('/sports', sportListAction);               // Liste de tous les sports
router.get('/sports/:sportId', sportShowAction);      // Détails d'un sport

// Routes pour les événements
router.get('/events', eventListAction);               // Liste de tous les événements
router.get('/events/:eventId', eventShowAction);      // Détails d'un événement

// Routes pour les participations
router.get('/participations', participateListAction); // Liste des participations
router.get('/participations/:id', participateShowAction); // Détails d'une participation

// Routes pour les pays
router.get('/countries', countryListAction);          // Liste de tous les pays
router.get('/countries/:countryId', countryShowAction); // Détails d'un pays

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
    response.send(JSON.stringify(sports));
}

async function sportShowAction(request, response) {
    var sport = await sportRepo.getSportById(request.params.sportId);
    response.send(JSON.stringify(sport));
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
    var country = await countryRepo.getCountryById(request.params.countryId);
    response.send(JSON.stringify(country));
}

module.exports = router;
