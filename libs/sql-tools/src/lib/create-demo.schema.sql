CREATE TABLE users (
    uuid INTEGER NOT NULL UNIQUE,
    login VARCHAR(25) NOT NULL UNIQUE,
    passwd VARCHAR(64) NOT NULL,
    authlevel INTEGER,
    PRIMARY KEY (uuid)
);

INSERT INTO users (login,passwd,authlevel) VALUES ('user 1', '1234', 10);
INSERT INTO users (login,passwd,authlevel) VALUES ('user 2', '4567', 9);
INSERT INTO users (login,passwd,authlevel) VALUES ('user 3', '8910', 8);
INSERT INTO users (login,passwd,authlevel) VALUES ('user 4', '1112', 5);
INSERT INTO users (login,passwd,authlevel) VALUES ('user 5', '1314', 3);
INSERT INTO users (login,passwd,authlevel) VALUES ('user 6', '1516', 1);
