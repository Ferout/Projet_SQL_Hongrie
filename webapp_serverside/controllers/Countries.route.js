const express = require('express');
const router = express.Router();
const countryRepo = require('../utils/Countries.repository');


router.get('/', countryListAction);
router.get('/:ID_country', countryShowAction);
router.post('/', countryCreateAction);
router.put('/:ID_country', countryUpdateAction);
router.delete('/:ID_country', countryDeleteAction);


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


module.exports = router;