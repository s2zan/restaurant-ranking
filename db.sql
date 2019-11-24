CREATE DATABASE IF NOT EXISTS EWHA;

USE EWHA;

CREATE TABLE IF NOT EXISTS USERS
(
    ID VARCHAR(20) NOT NULL,
    PWD VARCHAR(20) NOT NULL,
    `NAME` VARCHAR(20) NOT NULL,
    PRIMARY KEY(ID)
);

CREATE TABLE IF NOT EXISTS RESTAURANTS
(
    ID BIGINT NOT NULL AUTO_INCREMENT,
    `NAME` VARCHAR(20) NOT NULL,
    `ADDRESS` VARCHAR(45) NOT NULL,
    PRIMARY KEY(ID)
);

CREATE TABLE IF NOT EXISTS TAGS
(
    ID BIGINT NOT NULL AUTO_INCREMENT,
    `NAME` VARCHAR(20) NOT NULL,
    `DESC` TEXT,
    PRIMARY KEY(ID)
);

CREATE TABLE IF NOT EXISTS MAPPING_TAG_RESTAURANT
(
    RESTAURANT_ID BIGINT NOT NULL,
    TAG_ID BIGINT NOT NULL,
    PRIMARY KEY(RESTAURANT_ID, TAG_ID),
    FOREIGN KEY (RESTAURANT_ID) REFERENCES RESTAURANTS(ID) ON DELETE CASCADE,
    FOREIGN KEY (TAG_ID) REFERENCES TAGS(ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS MENUS
(
    ID BIGINT NOT NULL AUTO_INCREMENT,
    RESTAURANT_ID BIGINT NOT NULL,
    `NAME` VARCHAR(15) NOT NULL,
    PRICE BIGINT NOT NULL,
    PRIMARY KEY(ID),
    FOREIGN KEY (RESTAURANT_ID) REFERENCES RESTAURANTS(ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS REVIEWS
(
    ID BIGINT NOT NULL AUTO_INCREMENT,
    RESTAURANT_ID BIGINT NOT NULL,
    USER_ID VARCHAR(20) NOT NULL,
    COMMENT VARCHAR(50) NOT NULL,
    SCORE BIGINT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (USER_ID) REFERENCES USERS(ID) ON DELETE CASCADE,
    FOREIGN KEY (RESTAURANT_ID) REFERENCES RESTAURANTS(ID) ON DELETE CASCADE
);