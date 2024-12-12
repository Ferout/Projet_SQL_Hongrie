// Charger les variables d'environnement à partir du fichier .env
require('dotenv').config();

// Importation des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const auth = require('./utils/users.auth'); // Configuration Passport.js pour l'authentification

// Création de l'application Express
const app = express();

// Configuration du port du serveur à partir des variables d'environnement
const port = process.env.WEB_PORT || 3000;

// *** MIDDLEWARES ***
// Configuration de CORS pour permettre les requêtes cross-origin
app.use(cors({
    origin: 'http://localhost:8080', // URL du frontend Vue.js
    credentials: true, // Support des cookies/sessions
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware pour analyser les données des requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration des sessions
app.use(session({
    secret: "SecretRandomStringDskghadslkghdlkghdghaksdghdksh",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: false, secure: false }, // 1 jour
    resave: false
}));

// Initialisation de Passport.js pour l'authentification
auth.initializeAuthentications(app);

// *** ROUTES ***
// Routes pour les services d'authentification


// Routes statiques
app.use('/static', express.static(__dirname + '/static'));



app.use('/athletes', require('./controllers/Athletes.route'));
app.use('/sports', require('./controllers/Sports.route'));
app.use('/events', require('./controllers/Events.route'));
app.use('/countries', require('./controllers/Countries.route'));
app.use('/participations', require('./controllers/Participate.route'));
app.use('/auth', require('./controllers/auth.route'));


// Route d'accueil
app.get('/', (req, res) => {
    const clientIp = req.ip;
    res.send(`Hello, dear ${clientIp}. I am a Node.js website...`);
});

// *** DÉMARRER LE SERVEUR ***
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
