SET TRANSACTION NAME "create_roles";
INSERT INTO "roles" ("name") VALUES ('root');
INSERT INTO "roles" ("name") VALUES ('admin');
INSERT INTO "roles" ("name") VALUES ('client');
COMMIT;

SET TRANSACTION NAME "create_user_statuses";
INSERT INTO "user_statuses" ("name") VALUES ('enabled');
INSERT INTO "user_statuses" ("name") VALUES ('disabled');
COMMIT;

SET TRANSACTION NAME "create_dni_types";
INSERT INTO "dni_types" ("name") VALUES ('CC');
INSERT INTO "dni_types" ("name") VALUES ('CE');
INSERT INTO "dni_types" ("name") VALUES ('PA');
COMMIT;

SET TRANSACTION NAME "create_genders";
INSERT INTO "genders" ("name") VALUES ('Femenino');
INSERT INTO "genders" ("name") VALUES ('Masculino');
INSERT INTO "genders" ("name") VALUES ('Otros');
COMMIT;

SET TRANSACTION NAME "create_genres";
INSERT INTO "genres" ("name") VALUES ('Romance');
INSERT INTO "genres" ("name") VALUES ('Realismo');
INSERT INTO "genres" ("name") VALUES ('Comedia');
INSERT INTO "genres" ("name") VALUES ('Suspenso');
INSERT INTO "genres" ("name") VALUES ('Fantasia');
INSERT INTO "genres" ("name") VALUES ('Drama');
INSERT INTO "genres" ("name") VALUES ('Tragedia');
INSERT INTO "genres" ("name") VALUES ('Misterio');
INSERT INTO "genres" ("name") VALUES ('Terror');
COMMIT;

SET TRANSACTION NAME "create_languages";
INSERT INTO "languages" ("name") VALUES ('English');
INSERT INTO "languages" ("name") VALUES ('Español');
INSERT INTO "languages" ("name") VALUES ('French');
INSERT INTO "languages" ("name") VALUES ('Deutsche');
COMMIT;

SET TRANSACTION NAME "create_transaction_types";
INSERT INTO "transaction_types" ("name") VALUES ('buy');
INSERT INTO "transaction_types" ("name") VALUES ('book');
COMMIT;

SET TRANSACTION NAME "create_transaction_statuses";
INSERT INTO "transaction_statuses" ("name") VALUES ('bought');
INSERT INTO "transaction_statuses" ("name") VALUES ('reserved');
COMMIT;

SET TRANSACTION NAME "create_reasons";
INSERT INTO "reasons" ("name") VALUES ('Defecto de fabrica');
INSERT INTO "reasons" ("name") VALUES ('No lo quiero');
COMMIT;

SET TRANSACTION NAME "create_refund_statuses";
INSERT INTO "refund_statuses" ("name") VALUES ('Accepted');
INSERT INTO "refund_statuses" ("name") VALUES ('rejected');
INSERT INTO "refund_statuses" ("name") VALUES ('requested');
COMMIT;