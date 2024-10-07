CREATE DATABASE if not exists JO;
USE JO;

DROP TABLE IF EXISTS Participate;
DROP TABLE IF EXISTS Athletes;
DROP TABLE IF EXISTS Country;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Sport;
DROP TABLE IF EXISTS Ranking;

CREATE TABLE Sport (
    ID_sport INT PRIMARY KEY AUTO_INCREMENT,
    Sport_name VARCHAR(50) NOT NULL,
    Minimum_weight DECIMAL(15,2),
    Maximum_weight DECIMAL(15,2),
    Team_sport BOOLEAN,
    Number_of_player INT
);


CREATE TABLE Events (
    ID_events INT PRIMARY KEY AUTO_INCREMENT,
    Event_name VARCHAR(50) NOT NULL,
    Event_place VARCHAR(50),
    Event_date DATE,
    Event_winner VARCHAR(50),
    Number_of_place INT,
    ID_sport INT,
    FOREIGN KEY (ID_sport) REFERENCES Sport(ID_sport)
);


CREATE TABLE Ranking (
    ID_ranking INT PRIMARY KEY AUTO_INCREMENT,
    Number_of_medal INT,
    Rank_of_the_country INT,
    Gold_medal INT,
    Bronze_medal INT,
    Silver_medal INT
);


CREATE TABLE Country (
    ID_country INT PRIMARY KEY AUTO_INCREMENT,
    Country_name VARCHAR(50),
    ID_ranking INT,
    FOREIGN KEY (ID_ranking) REFERENCES Ranking(ID_ranking)
);


CREATE TABLE Athletes (
    ID_Athlete INT PRIMARY KEY AUTO_INCREMENT,
    First_name VARCHAR(50),
    Family_name VARCHAR(50),
    Age INT,
    Adress VARCHAR(100),
    Phone_number VARCHAR(50),
    ID_country INT,
    ID_sport INT,
    FOREIGN KEY (ID_country) REFERENCES Country(ID_country),
    FOREIGN KEY (ID_sport) REFERENCES Sport(ID_sport)
);


CREATE TABLE Participate (
    ID_Athlete INT,
    ID_events INT,
    PRIMARY KEY (ID_Athlete, ID_events),
    FOREIGN KEY (ID_Athlete) REFERENCES Athletes(ID_Athlete),
    FOREIGN KEY (ID_events) REFERENCES Events(ID_events)
);


INSERT INTO Ranking (Number_of_medal, Rank_of_the_country, Gold_medal, Bronze_medal, Silver_medal)
VALUES (126, 1, 40, 42, 44),
(98, 2, 30, 32, 36),
(75, 3, 25, 20, 30),
(50, 4, 15, 20, 15),
(30, 5, 10, 8, 12);


INSERT INTO Country (Country_name, ID_ranking)
VALUES 
('USA', 1),
('China', 2),
('Germany', 3),
('France', 4),
('Japan', 5);


INSERT INTO Sport (Sport_name, Minimum_weight, Maximum_weight, Team_sport, Number_of_player)
VALUES ('100 meters', NULL, NULL, FALSE, 1),
('200 meters', NULL, NULL, FALSE, 1),
('Football', 70.00, 100.00, TRUE, 11),
('Basketball', 60.00, 120.00, TRUE, 5),
('Swimming', NULL, NULL, FALSE, 1);


INSERT INTO Events (Event_name, Event_place, Event_date, Event_winner, Number_of_place, ID_sport)
VALUES ('100 meters', 'Défense Arena', '2024-07-25', 'László Cseh', 40000, 1),
('200 meters', 'Stade Olympique', '2024-07-26', 'Usain Bolt', 80000, 2),
('Football Final', 'Wembley Stadium', '2024-07-27', 'Brazil', 90000, 3),
('Basketball Final', 'Staples Center', '2024-07-28', 'USA', 20000, 4),
('Swimming 100m', 'Aquatics Centre', '2024-07-25', 'Katie Ledecky', 15000, 5);

INSERT INTO Athletes (First_name, Family_name, Age, Adress, Phone_number, ID_country, ID_sport)
VALUES ('léon', 'marchand', 22, 'Paris', '0123456789', 1, 1),
('Usain', 'Bolt', 36, 'Kingston', '0123456781', 2, 2),
('Neymar', 'Junior', 32, 'Rio de Janeiro', '0123456782', 3, 3),
('Kevin', 'Durant', 34, 'Washington', '0123456783', 1, 4),
('Katie', 'Ledecky', 27, 'Bethesda', '0123456784', 1, 5);

-- Insertion dans la table Participate
INSERT INTO Participate (ID_Athlete, ID_events)
VALUES (1, 1),
(2, 2), 
(3, 3), 
(4, 4),  
(5, 5);

SELECT * FROM Athletes;

SELECT * FROM Ranking
ORDER BY Gold_medal DESC;

SELECT * FROM Events;

SELECT * FROM Country;






