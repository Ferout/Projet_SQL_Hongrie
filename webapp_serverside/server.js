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
app.set('view engine', 'ejs');
app.set('views', 'views');

// Configuration du port du serveur à partir des variables d'environnement
const port = process.env.WEB_PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on ${port}`);
});

// *** MIDDLEWARES ***
// Configuration de CORS pour permettre les requêtes cross-origin
app.use(cors({
    origin: 'http://localhost:8080', // Frontend Vue.js
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

// Routes pour les services d'authentification
app.use('/auth', require('./controllers/auth.route'));

// *** ROUTES PRINCIPALES ***
// Route d'accueil
app.get('/', (request, response) => {
    let clientIp = request.ip;
    response.send(`Hello, dear ${clientIp}. I am a nodejs website...`);
    response.end(); // Optionnel
});

// Routes statiques
app.use('/static', express.static(__dirname + '/static'));

// Importation des autres routes
app.use('/api', require('./controllers/api.route')); // API principale
app.use('/auth', require('./controllers/auth.route')); // Exemple d'autres entités

// Exemple de requête fetch (si exécutée dans un environnement séparé)
fetch('http://localhost:3000/api/countries', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_token_here' // Si vous utilisez des tokens
    },
    credentials: 'include' // Pour inclure les cookies/sessions
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
