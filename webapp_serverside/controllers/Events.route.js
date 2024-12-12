const express = require('express');
const router = express.Router();
const eventRepo = require('../utils/Events.repository');


router.get('/', eventListAction);
router.get('/:ID_events', eventShowAction);
router.post('/', eventCreateAction);
router.put('/:ID_events', eventUpdateAction);
router.delete('/:ID_events', eventDeleteAction);


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

module.exports = router;
