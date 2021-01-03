
INSERT INTO roles (name) VALUES ('root');
INSERT INTO roles (name) VALUES ('admin');
INSERT INTO roles (name) VALUES ('client');
COMMIT;


INSERT INTO user_statuses (name) VALUES ('enabled');
INSERT INTO user_statuses (name) VALUES ('disabled');
COMMIT;


INSERT INTO dni_types (name) VALUES ('CC');
INSERT INTO dni_types (name) VALUES ('CE');
INSERT INTO dni_types (name) VALUES ('PA');
COMMIT;


INSERT INTO genders (name) VALUES ('Femenino');
INSERT INTO genders (name) VALUES ('Masculino');
INSERT INTO genders (name) VALUES ('Otros');
COMMIT;


INSERT INTO genres (name) VALUES ('Romance');
INSERT INTO genres (name) VALUES ('Realismo');
INSERT INTO genres (name) VALUES ('Comedia');
INSERT INTO genres (name) VALUES ('Suspenso');
INSERT INTO genres (name) VALUES ('Fantasia');
INSERT INTO genres (name) VALUES ('Drama');
INSERT INTO genres (name) VALUES ('Tragedia');
INSERT INTO genres (name) VALUES ('Misterio');
INSERT INTO genres (name) VALUES ('Terror');
COMMIT;


INSERT INTO languages (name) VALUES ('English');
INSERT INTO languages (name) VALUES ('Español');
INSERT INTO languages (name) VALUES ('French');
INSERT INTO languages (name) VALUES ('Deutsche');
COMMIT;


INSERT INTO transaction_types (name) VALUES ('buy');
INSERT INTO transaction_types (name) VALUES ('book');
COMMIT;


INSERT INTO transaction_statuses (name) VALUES ('bought');
INSERT INTO transaction_statuses (name) VALUES ('reserved');
COMMIT;

INSERT INTO reasons (name) VALUES ('Defecto de fábrica.');
INSERT INTO reasons (name) VALUES ('Ya no lo quiero.');
COMMIT;


INSERT INTO refund_statuses (name) VALUES ('Accepted');
INSERT INTO refund_statuses (name) VALUES ('rejected');
INSERT INTO refund_statuses (name) VALUES ('requested');
COMMIT;