CREATE DATABASE milk_and_manure;

CREATE TABLE mccs (
    id VARCHAR(80) NOT NULL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    number INTEGER NOT NULL,
    province VARCHAR(80),
    district VARCHAR(80),
    sector VARCHAR(80),
    code VARCHAR(20),
    status VARCHAR(10),
    registrationDate DATE
);

CREATE TABLE useraccounts (
    id VARCHAR(80) NOT NULL PRIMARY KEY,
    fullName VARCHAR(80) NOT NULL,
    email VARCHAR(80) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    nationalId varchar(16) NOT NULL,
    province VARCHAR(80),
    district VARCHAR(80),
    sector VARCHAR(80),
    role VARCHAR(10),
    password VARCHAR(80),
    status VARCHAR(10),
    mccId VARCHAR(80),
    mccName VARCHAR(80),
    joinDate DATE NOT NULL,
    FOREIGN KEY (mccId) REFERENCES mcc(id)
);

CREATE TABLE milk_production (
    id SERIAL NOT NULL PRIMARY KEY,
    date DATE NOT NULL,
    farmerId VARCHAR(80) NOT NULL,
    farmerName VARCHAR(80) NOT NULL,
    farmerPhone VARCHAR(10) NOT NULL,
    mccId VARCHAR(80),
    mccName VARCHAR(80),
    district VARCHAR(80),
    sector VARCHAR(80),
    quantity INT,
    FOREIGN KEY (farmerId) REFERENCES userAccount(id),
    FOREIGN KEY (mccId) REFERENCES mcc(id)
);

CREATE TABLE manure_production (
    id SERIAL NOT NULL PRIMARY KEY,
    date DATE NOT NULL,
    farmerId VARCHAR(80) NOT NULL,
    farmerName VARCHAR(80) NOT NULL,
    farmerPhone VARCHAR(10) NOT NULL,
    mccId VARCHAR(80),
    mccName VARCHAR(80),
    district VARCHAR(80),
    sector VARCHAR(80),
    quantity INT,
    FOREIGN KEY (farmerId) REFERENCES userAccount(id),
    FOREIGN KEY (mccId) REFERENCES mcc(id)
);
