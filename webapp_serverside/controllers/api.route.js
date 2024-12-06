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
router.post('/participations', participateCreateAction);
router.put('/participations/:athlete_id/:event_id', participateUpdateAction);
router.delete('/participations/:athlete_id/:event_id', participateDeleteAction);

// Routes pour les pays
router.get('/countries', countryListAction);
router.get('/countries/:ID_country', countryShowAction);
router.post('/countries', countryCreateAction);
router.put('/countries/:ID_country', countryUpdateAction);
router.delete('/countries/:ID_country', countryDeleteAction);

// Actions for athletes
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

// Actions pour les sports
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


// Actions for participations
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

// Actions for countries
async function countryListAction(request, response) {
    try {
        const countries = await countryRepo.getAllCountries();
        response.json(countries);
    } catch (err) {
        console.error("Error fetching countries:", err);
        response.status(500).json({ error: "Error fetching countries" });
    }
}

async function countryShowAction(request, response) {
    try {
        const country = await countryRepo.getCountryById(request.params.ID_country);
        if (!country) {
            response.status(404).json({ error: "Country not found" });
        } else {
            response.json(country);
        }
    } catch (err) {
        console.error("Error fetching country:", err);
        response.status(500).json({ error: "Error fetching country" });
    }
}

async function countryCreateAction(request, response) {
    try {
        const newCountry = await countryRepo.addCountry(request.body);
        response.status(201).json(newCountry);
    } catch (err) {
        console.error("Error creating country:", err);
        response.status(500).json({ error: "Error creating country" });
    }
}

async function countryUpdateAction(request, response) {
    try {
        const updatedCountry = await countryRepo.updateCountry(request.params.ID_country, request.body);
        response.json(updatedCountry);
    } catch (err) {
        console.error("Error updating country:", err);
        response.status(500).json({ error: "Error updating country" });
    }
}

async function countryDeleteAction(request, response) {
    try {
        const numRows = await countryRepo.deleteCountry(request.params.ID_country);
        response.json({ rowsDeleted: numRows });
    } catch (err) {
        console.error("Error deleting country:", err);
        response.status(500).json({ error: "Error deleting country" });
    }
}

// Actions pour les événements
async function eventListAction(request, response) {
    try {
        const events = await eventRepo.getAllEvents();
        response.json(events);
    } catch (err) {
        console.error("Error fetching events:", err);
        response.status(500).json({ error: "Error fetching events" });
    }
}

async function eventShowAction(request, response) {
    try {
        const event = await eventRepo.getEventById(request.params.ID_events);
        if (!event) {
            response.status(404).json({ error: "Event not found" });
        } else {
            response.json(event);
        }
    } catch (err) {
        console.error("Error fetching event:", err);
        response.status(500).json({ error: "Error fetching event" });
    }
}

async function eventCreateAction(request, response) {
    try {
        const newEvent = await eventRepo.addEvent(request.body);
        response.status(201).json(newEvent);
    } catch (err) {
        console.error("Error creating event:", err);
        response.status(500).json({ error: "Error creating event" });
    }
}

async function eventUpdateAction(request, response) {
    try {
        const updatedEvent = await eventRepo.updateEvent(request.params.ID_events, request.body);
        if (updatedEvent) {
            response.json({ message: "Event updated successfully" });
        } else {
            response.status(404).json({ error: "Event not found" });
        }
    } catch (err) {
        console.error("Error updating event:", err);
        response.status(500).json({ error: "Error updating event" });
    }
}

async function eventDeleteAction(request, response) {
    try {
        const numRows = await eventRepo.deleteEvent(request.params.ID_events);
        if (numRows > 0) {
            response.json({ message: "Event deleted successfully" });
        } else {
            response.status(404).json({ error: "Event not found" });
        }
    } catch (err) {
        console.error("Error deleting event:", err);
        response.status(500).json({ error: "Error deleting event" });
    }
}

// Ajout des autres fonctions similaires pour les athlètes, sports, participations et pays (déjà fournies dans les sections précédentes).

module.exports = router;
