DROP DATABASE IF EXISTS guestphotos;

CREATE DATABASE guestphotos;

USE guestphotos;

CREATE TABLE photos (
  photoId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  photoUrl varchar(200) NOT NULL,
  alt varchar(125) NOT NULL,
  username varchar(40) NOT NULL,
  experienceId int NOT NULL
);
