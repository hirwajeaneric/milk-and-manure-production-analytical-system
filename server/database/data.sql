CREATE DATABASE milk_and_manure;

CREATE TABLE mcc (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    number VARCHAR(80) NOT NULL,
    province VARCHAR(80),
    district VARCHAR(80),
    sector VARCHAR(80),
    code VARCHAR(20),
    status VARCHAR(10),
    registrationDate DATE
);

-- code is made of district name and mcc number: 
-- Ex: gasabo01 

CREATE TABLE useraccount (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    fullName VARCHAR(80) NOT NULL,
    email VARCHAR(80) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    province VARCHAR(80),
    district VARCHAR(80),
    sector VARCHAR(80),
    userRole VARCHAR(10),
    password VARCHAR(255),
    status VARCHAR(10),
    mccId VARCHAR(255),
    mccName VARCHAR(80),
    joinDate DATE NOT NULL,
    FOREIGN KEY (mccId) REFERENCES mcc(id)
);

CREATE TABLE milk_production (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    date DATE NOT NULL,
    farmerId VARCHAR(255) NOT NULL,
    farmerName VARCHAR(80) NOT NULL,
    farmerPhone VARCHAR(10) NOT NULL,
    mccId VARCHAR(255),
    mccName VARCHAR(80),
    district VARCHAR(80),
    sector VARCHAR(80),
    quantity INT,
    FOREIGN KEY (farmerId) REFERENCES userAccount(id),
    FOREIGN KEY (mccId) REFERENCES mcc(id)
);

CREATE TABLE manure_production (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    date DATE NOT NULL,
    farmerId VARCHAR(255) NOT NULL,
    farmerName VARCHAR(80) NOT NULL,
    farmerPhone VARCHAR(10) NOT NULL,
    mccId VARCHAR(255),
    mccName VARCHAR(80),
    district VARCHAR(80),
    sector VARCHAR(80),
    quantity INT,
    FOREIGN KEY (farmerId) REFERENCES userAccount(id),
    FOREIGN KEY (mccId) REFERENCES mcc(id)
);
