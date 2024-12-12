require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const auth = require('./utils/users.auth'); 

const app = express();

const port = process.env.WEB_PORT || 3000;

app.use(cors({
    origin: 'http://localhost:8080', 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "SecretRandomStringDskghadslkghdlkghdghaksdghdksh",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: false, secure: false }, 
    resave: false
}));

auth.initializeAuthentications(app);


app.use('/static', express.static(__dirname + '/static'));



app.use('/athletes', require('./controllers/Athletes.route'));
app.use('/sports', require('./controllers/Sports.route'));
app.use('/events', require('./controllers/Events.route'));
app.use('/countries', require('./controllers/Countries.route'));
app.use('/participations', require('./controllers/Participate.route'));
app.use('/auth', require('./controllers/auth.route'));


app.get('/', (req, res) => {
    const clientIp = req.ip;
    res.send(`Hello, dear ${clientIp}. I am a Node.js website...`);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
