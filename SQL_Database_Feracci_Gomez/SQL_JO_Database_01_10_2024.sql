CREATE DATABASE IF NOT EXISTS JO;
USE JO;

-- Suppression des tables existantes si elles existent
DROP TABLE IF EXISTS Participate;
DROP TABLE IF EXISTS Athletes;
DROP TABLE IF EXISTS Country;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Sport;

-- Table Sport
CREATE TABLE Sport (
    ID_sport INT PRIMARY KEY AUTO_INCREMENT,
    Sport_name VARCHAR(50) NOT NULL,
    Minimum_weight DECIMAL(15,2),
    Maximum_weight DECIMAL(15,2),
    Team_sport BOOLEAN,
    Number_of_player INT
);

-- Table Events (Suppression de Event_winner)
CREATE TABLE Events (
    ID_events INT PRIMARY KEY AUTO_INCREMENT,
    Event_name VARCHAR(50) NOT NULL,
    Event_place VARCHAR(50),
    Event_date DATE,
    Number_of_place INT,
    ID_sport INT,
    FOREIGN KEY (ID_sport) REFERENCES Sport(ID_sport)
);

-- Table Country
CREATE TABLE Country (
    ID_country INT PRIMARY KEY AUTO_INCREMENT,
    Country_name VARCHAR(50)
);

-- Table Athletes (Suppression de la clé étrangère ID_sport)
CREATE TABLE Athletes (
    ID_Athlete INT PRIMARY KEY AUTO_INCREMENT,
    First_name VARCHAR(50),
    Family_name VARCHAR(50),
    Age INT,
    Adress VARCHAR(100),
    Phone_number VARCHAR(50),
    ID_country INT,
    FOREIGN KEY (ID_country) REFERENCES Country(ID_country)
);

-- Table Participate (Ajout du résultat de l'événement)
CREATE TABLE Participate (
    ID_Athlete INT,
    ID_events INT,
    Result VARCHAR(50), -- Ajout de la colonne "Result" pour stocker le résultat de l'athlète
    PRIMARY KEY (ID_Athlete, ID_events),
    FOREIGN KEY (ID_Athlete) REFERENCES Athletes(ID_Athlete),
    FOREIGN KEY (ID_events) REFERENCES Events(ID_events)
);

-- Insertion dans la table Sport
INSERT INTO Sport (Sport_name, Minimum_weight, Maximum_weight, Team_sport, Number_of_player)
VALUES 
('100 meters', NULL, NULL, FALSE, 1),
('200 meters', NULL, NULL, FALSE, 1),
('Football', 70.00, 100.00, TRUE, 11),
('Basketball', 60.00, 120.00, TRUE, 5),
('Swimming', NULL, NULL, FALSE, 1);

-- Insertion dans la table Events (Suppression de Event_winner)
INSERT INTO Events (Event_name, Event_place, Event_date, Number_of_place, ID_sport)
VALUES 
('100 meters', 'Défense Arena', '2024-07-25', 40000, 1),
('200 meters', 'Stade Olympique', '2024-07-26', 80000, 2),
('Football Final', 'Wembley Stadium', '2024-07-27', 90000, 3),
('Basketball Final', 'Staples Center', '2024-07-28', 20000, 4),
('Swimming 200m', 'Aquatics Centre', '2024-07-25', 15000, 5);

-- Insertion dans la table Country
INSERT INTO Country (Country_name)
VALUES 
('USA'),
('China'),
('France'),
('Japan'),
('England');

-- Insertion dans la table Athletes (Suppression de ID_sport)
INSERT INTO Athletes (First_name, Family_name, Age, Adress, Phone_number, ID_country)
VALUES 
('Léon', 'Marchand', 22, 'Paris', '0123456789', 4),
('Scott', 'D.', 36, 'London', '0123456781', 5),
('Wang', 'S.', 32, 'Tokyo', '0123456782', 2),
('Kevin', 'Durant', 34, 'Washington', '0123456783', 1),
('Katie', 'Ledecky', 27, 'Bethesda', '0123456784', 1);

-- Insertion dans la table Participate avec les résultats des athlètes
INSERT INTO Participate (ID_Athlete, ID_events, Result)
VALUES 
(1, 5, '1nd place'),
(2, 5, '2st place'),
(3, 5, '3st place'),
(4, 4, '1st place'),
(5, 4, '4st place');

-- Sélectionner toutes les données de la table Athletes
SELECT * FROM Athletes;

-- Sélectionner tous les événements
SELECT * FROM Events;

-- Sélectionner tous les pays
SELECT * FROM Country;

-- Sélectionner toutes les participations avec les résultats
SELECT * FROM Participate;

SELECT * FROM sport;