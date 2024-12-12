CREATE DATABASE IF NOT EXISTS JO;
USE JO;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS Participate;
DROP TABLE IF EXISTS Athletes;
DROP TABLE IF EXISTS Countries;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS sports;
DROP TABLE IF EXISTS User;

-- Table Sport
CREATE TABLE sports (
    ID_sport INT PRIMARY KEY AUTO_INCREMENT,
    Sport_name VARCHAR(50) NOT NULL,
    Minimum_weight DECIMAL(15,2),
    Maximum_weight DECIMAL(15,2),
    Team_sport BOOLEAN,
    Number_of_player INT
);

-- Table Events (Removed Event_winner)
CREATE TABLE Events (
    ID_events INT PRIMARY KEY AUTO_INCREMENT,
    Event_name VARCHAR(50) NOT NULL,
    Event_place VARCHAR(50),
    Event_date DATE,
    Number_of_place INT,
    ID_sport INT,
    FOREIGN KEY (ID_sport) REFERENCES Sports(ID_sport)
);

-- Table Countries
CREATE TABLE Countries (
    ID_country INT PRIMARY KEY AUTO_INCREMENT,
    Country_name VARCHAR(50)
);

-- Table Athletes (Removed foreign ID_sport)
CREATE TABLE Athletes (
    ID_Athlete INT PRIMARY KEY AUTO_INCREMENT,
    First_name VARCHAR(50),
    Family_name VARCHAR(50),
    Age INT,
    Adress VARCHAR(100),
    Phone_number VARCHAR(50),
    ID_country INT,
    FOREIGN KEY (ID_country) REFERENCES Countries(ID_country)
);

-- Table Participate (Added event result)
CREATE TABLE Participate (
    ID_Athlete INT,
    ID_events INT,
    Result VARCHAR(50), -- Added "Result" column to store athlete's result
    PRIMARY KEY (ID_Athlete, ID_events),
    FOREIGN KEY (ID_Athlete) REFERENCES Athletes(ID_Athlete),
    FOREIGN KEY (ID_events) REFERENCES Events(ID_events)
);

CREATE TABLE User(
ID_user INT PRIMARY KEY,
Password VARCHAR(50),
Username VARCHAR(50),
IsAdmin boolean
);

-- Insertion into Sport table
INSERT INTO sports (Sport_name, Minimum_weight, Maximum_weight, Team_sport, Number_of_player)
VALUES 
('100 meters', NULL, NULL, FALSE, 1),
('200 meters', NULL, NULL, FALSE, 1),
('Football', 70.00, 100.00, TRUE, 11),
('Basketball', 60.00, 120.00, TRUE, 5),
('Swimming', NULL, NULL, FALSE, 1);

-- Insertion into Events table (Removed Event_winner)
INSERT INTO Events (Event_name, Event_place, Event_date, Number_of_place, ID_sport)
VALUES 
('100 meters', 'Défense Arena', '2024-07-25', 40000, 1),
('200 meters', 'Stade Olympique', '2024-07-26', 80000, 2),
('Football Final', 'Wembley Stadium', '2024-07-27', 90000, 3),
('Basketball Final', 'Staples Center', '2024-07-28', 20000, 4),
('Swimming 200m', 'Aquatics Centre', '2024-07-25', 15000, 5);

-- Insertion into Countries table
INSERT INTO Countries (Country_name)
VALUES 
('USA'),
('China'),
('France'),
('Japan'),
('England');

-- Insertion into Athletes table (Removed ID_sport)
INSERT INTO Athletes (First_name, Family_name, Age, Adress, Phone_number, ID_country)
VALUES 
('Léon', 'Marchand', 22, 'Paris', '0123456789', 4),
('Scott', 'D.', 36, 'London', '0123456781', 5),
('Wang', 'S.', 32, 'Tokyo', '0123456782', 2),
('Kevin', 'Durant', 34, 'Washington', '0123456783', 1),
('Katie', 'Ledecky', 27, 'Bethesda', '0123456784', 1);

-- Insertion into Participate table with athlete results
INSERT INTO Participate (ID_Athlete, ID_events, Result)
VALUES 
(1, 5, '1st place'),
(2, 5, '2nd place'),
(3, 5, '3st place'),
(4, 4, '1st place'),
(5, 4, '4st place');

INSERT INTO User (ID_user, Password, Username,IsAdmin) Values
(1, 'wifi', 'Messi','0'),
(2, 'test', 'Aurélien','1');

-- Select all data from Athletes table
SELECT * FROM Athletes;

-- Select all events
SELECT * FROM Events;

-- Select all countries
SELECT * FROM Countries;

-- Select all participations with results
SELECT * FROM Participate;

-- Select all sports
SELECT * FROM sports;

-- Select all users
SELECT * FROM user;