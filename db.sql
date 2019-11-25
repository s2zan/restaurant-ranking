DROP DATABASE team20

CREATE DATABASE team20;

USE team20;

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
    PRICE INT,
    PRIMARY KEY(ID),
    FOREIGN KEY (RESTAURANT_ID) REFERENCES RESTAURANTS(ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS REVIEWS
(
    ID BIGINT NOT NULL AUTO_INCREMENT,
    RESTAURANT_ID BIGINT NOT NULL,
    USER_ID VARCHAR(20) NOT NULL,
    COMMENT TEXT NOT NULL,
    SCORE BIGINT NOT NULL,
    CREATED_AT DATETIME NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (USER_ID) REFERENCES USERS(ID) ON DELETE CASCADE,
    FOREIGN KEY (RESTAURANT_ID) REFERENCES RESTAURANTS(ID) ON DELETE CASCADE
);


# 23
INSERT INTO USERS (ID, PWD, NAME)
VALUES
('MinsooLee','1234', 'Minsoo'),
('JianLee','1234', 'Jian'),
('ChooSir','1234', 'Choo'),
('user1','1234', 'user1'),
('user2','1234', 'user2'),
('user3','1234', 'user3'),
('user4','1234', 'user4'),
('user5','1234', 'user5'),
('user6','1234', 'user6'),
('user7','1234', 'user7'),
('user8','1234', 'user8'),
('user9','1234', 'user9'),
('user10','1234', 'user10'),
('user11','1234', 'user11'),
('user12','1234', 'user12'),
('user13','1234', 'user13'),
('user14','1234', 'user14'),
('user15','1234', 'user15'),
('user16','1234', 'user16'),
('user17','1234', 'user17'),
('user18','1234', 'user18'),
('user19','1234', 'user19'),
('user20','1234', 'user20');

# 7
INSERT INTO RESTAURANTS (NAME, ADDRESS)
VALUES
('BurgerKing', 'Ewha01'),
('McDonalds', 'Ewha02'),
('GreekDay', 'Ewha03'),
('Apple Pie', 'Ewha04'),
('Berries Forest', 'Ewha04'),
('Noranjip', 'Ewha32'),
('Ewhain Waffle', 'Ewha59');

# 17
INSERT INTO MAPPING_TAG_RESTAURANT (RESTAURANT_ID, TAG_ID)
VALUES
(1, 2),
(2, 2),
(2, 8),
(2, 9),
(1, 8),
(3, 3),
(3, 5),
(3, 8),
(4, 3),
(4, 4),
(4, 5),
(4, 6),
(4, 7),
(5, 9),
(6, 1),
(6, 8),
(7, 4);

# 9
INSERT INTO TAGS (NAME, DESC)
VALUES
('Seafood', 'shrimp, crab, lobster'),
('Hamburger', 'Hamburger place'),
('Dessert', 'Dessert place'),
('Waffle', ' '),
('Fruits', 'desserts with fruits'),
('Icecream', 'Sweet icecream'),
('Warm and Cozy', 'cozy atmosphere'),
('Close to main gate', ' '),
('Kind', 'Kind staffs');

# 33
INSERT INTO MENUS(RESTAURANT_ID, NAME, PRICE)
VALUES
('1', 'Cheese Burger', 7000),
('1', 'Bacon Burger', 8000),
('1', 'Onion Garlic Burger', 7500),
('1', 'French Fries', 3000),
('1', 'Coke', 1000),
('1', 'Sparkling water', 1000),
('2', 'Cheese Burger', 5000),
('2', 'M Original Burger', 4000),
('2', 'Oreo McFlurry', 3500),
('3', 'Rose', 5000),
('3', 'Greenary', 4800),
('3', 'Blue diamonds', 4700),
('3', 'Golden', 4700),
('3', 'Turquois', 5000),
('4', 'Yogurt Cream cake', 4000),
('4', 'Decaf Americano', 3400),
('4', 'Apple carrot cake', 3700),
('4', 'Camomile tea', 4500),
('4', 'Pumpkin pie', 4700),
('4', 'Rooibose tea', 5000),
('4', 'Americano', 3000),
('4', 'Caffe Latte', 3500),
('4', 'Cafe Mocha', 4500),
('4', 'Apple pie', 5700),
('5', 'Strawberry Yogurt', 3700),
('5', 'Strawberry icecream', 3800),
('5', 'Milktea Yogurt', 3500),
('5', 'Affogato', 4000),
('5', 'Blueberry icecream', 3800),
('5', 'Blueberry yogurt', 3500),
('6', 'Alio Olio', 7000),
('6', 'Carbonara', 7500),
('6', 'Tomato Spagetti', 7300),
('7', 'Princess Waffle', 8300),
('7', 'Queen Waffle', 9000),
('7', 'Family Waffle', 10000);

INSERT INTO REVIEWS (RESTAURANT_ID, USER_ID, COMMENT, SCORE)
VALUES
(1, 'user1', 'The fries were very good and hot.', 4),
(1, 'user10', ' The burger not so good. ', 3),
(1, 'user11', 'Delicious', 5),
(1, 'user16', 'Bad', 1),
(1, 'user18', 'Soso', 3),
(1, 'user19', 'Hot and fresh', 5),
(1, 'ChooSir', 'Impressive', 5),
(1, 'JianLee', 'Not my style', 0),
(1, 'MinsooLee', 'I liked it', 2),
(1, 'user2', 'Baaaaadddd', 0),
(1, 'user3', 'expensive', 0),
(1, 'user4', 'nice atmosphere', 3),
(1, 'user5', 'taste not bad but too expensive', 4),
(1, 'user6', 'wanna come back soon', 5),
(1, 'user7', 'Not good to bring kids', 2),
(1, 'user8', 'whatever', 0),
(1, 'user9', 'hahahahah didnt like it at all', 0),
(1, 'user12', 'hungry so delicious', 2),
(1, 'user13', 'maybe not really good', 1),
(1, 'user14', 'Gooooooood', 5),
(1, 'user15', 'with ur family good', 5),
(2, 'user1', 'The fries were very good and hot.', 5),
(2, 'user10', ' The burger not so good. ', 2),
(2, 'user11', 'Delicious', 3),
(2, 'user16', 'Bad', 0),
(2, 'user18', 'Soso', 5),
(2, 'user19', 'Hot and fresh', 5),
(2, 'ChooSir', 'Impressive', 5),
(2, 'JianLee', 'Not my style', 4),
(2, 'MinsooLee', 'I liked it', 4),
(2, 'user2', 'Baaaaadddd', 3),
(2, 'user3', 'expensive', 4),
(2, 'user4', 'nice atmosphere', 4),
(2, 'user5', 'taste not bad but too expensive', 4),
(2, 'user6', 'wanna come back soon', 5),
(2, 'user7', 'Not good to bring kids', 2),
(2, 'user8', 'whatever', 0),
(2, 'user9', 'hahahahah didnt like it at all', 1),
(2, 'user12', 'hungry so delicious', 4),
(2, 'user13', 'maybe not really good', 5),
(2, 'user14', 'Gooooooood', 3),
(2, 'user15', 'with ur family good', 5),
(3, 'user1', 'The fries were very good and hot.', 1),
(3, 'user10', ' The burger not so good. ', 1),
(3, 'user11', 'Delicious', 2),
(3, 'user16', 'Bad', 1),
(3, 'user18', 'Soso', 1),
(3, 'user19', 'Hot and fresh', 0),
(3, 'ChooSir', 'Impressive', 1),
(3, 'JianLee', 'Not my style', 2),
(3, 'MinsooLee', 'I liked it', 1),
(3, 'user2', 'Baaaaadddd', 1),
(3, 'user3', 'expensive', 1),
(3, 'user4', 'nice atmosphere', 1),
(3, 'user5', 'taste not bad but too expensive', 0),
(3, 'user6', 'wanna come back soon', 2),
(3, 'user7', 'Not good to bring kids', 2),
(3, 'user8', 'whatever', 5),
(3, 'user9', 'hahahahah didnt like it at all', 0),
(3, 'user12', 'hungry so delicious', 2),
(3, 'user13', 'maybe not really good', 1),
(3, 'user14', 'Gooooooood', 2),
(3, 'user15', 'with ur family good', 3),
(4, 'user1', 'The fries were very good and hot.', 4),
(4, 'user10', ' The burger not so good. ', 3),
(4, 'user11', 'Delicious', 5),
(4, 'user16', 'Bad', 1),
(4, 'user18', 'Soso', 3),
(4, 'user19', 'Hot and fresh', 4),
(4, 'ChooSir', 'Impressive', 4),
(4, 'JianLee', 'Not my style', 4),
(4, 'MinsooLee', 'I liked it', 4),
(4, 'user2', 'Baaaaadddd', 3),
(4, 'user3', 'expensive', 4),
(4, 'user4', 'nice atmosphere', 3),
(4, 'user5', 'taste not bad but too expensive', 3),
(4, 'user6', 'wanna come back soon', 3),
(4, 'user7', 'Not good to bring kids', 4),
(4, 'user8', 'whatever', 0),
(4, 'user9', 'hahahahah didnt like it at all', 0),
(4, 'user12', 'hungry so delicious', 2),
(4, 'user13', 'maybe not really good', 4),
(4, 'user14', 'Gooooooood', 4),
(4, 'user15', 'with ur family good', 5),
(5, 'user1', 'The fries were very good and hot.', 4),
(5, 'user10', ' The burger not so good. ', 2),
(5, 'user11', 'Delicious', 2),
(5, 'user16', 'Bad', 1),
(5, 'user18', 'Soso', 3),
(5, 'user19', 'Hot and fresh', 2),
(5, 'ChooSir', 'Impressive', 2),
(5, 'JianLee', 'Not my style', 1),
(5, 'MinsooLee', 'I liked it', 2),
(5, 'user2', 'Baaaaadddd', 2),
(5, 'user3', 'expensive', 2),
(6, 'user4', 'nice atmosphere', 3),
(6, 'user5', 'taste not bad but too expensive', 4),
(6, 'user6', 'wanna come back soon', 2),
(6, 'user7', 'Not good to bring kids', 2),
(6, 'user8', 'whatever', 2),
(7, 'user9', 'hahahahah didnt like it at all', 3),
(7, 'user12', 'hungry so delicious', 3),
(7, 'user13', 'maybe not really good', 1),
(7, 'user14', 'Gooooooood', 3),
(7, 'user15', 'with ur family good', 3);