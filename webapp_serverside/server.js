// Charger les variables d'environnement à partir du fichier .env
require('dotenv').config();

// Importation des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

// Création de l'application Express
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

// Configuration du port du serveur à partir des variables d'environnement
const port = process.env.WEB_PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on ${port}`);
});

// Middleware
app.use(cors({
    origin: 'http://localhost:8080',  // Frontend Vue.js
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'],  // En-têtes autorisés
    credentials: true  // Si vous utilisez des cookies ou des tokens
}));

app.use(bodyParser.json()); // Parse les données JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parse les données URL-encoded

// Configuration de la session
app.use(session({
    secret: "SecretRandomStringDskghadslkghdlkghdghaksdghdksh",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 jour
    resave: false
}));

// Routes statiques
app.use("/static", express.static(__dirname + '/static'));

// Importation des contrôleurs (routes pour les entités)
app.use("/api", require("./controllers/api.route"));

// Route d'accueil
app.get('/', (request, response) => {
    let clientIp = request.ip;
    response.send(`Hello, dear ${clientIp}. I am a nodejs website...`);
    response.end(); // optional
});

fetch('http://localhost:3000/api/countries', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your_token_here'  // Si vous utilisez des tokens
    },
    credentials: 'include'  // Si vous avez besoin d'envoyer des cookies ou des sessions
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
  