
CREATE TABLE "roles" (
    "id" NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "user_statuses" (
    "id" NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "dni_types" (
    "id" NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "genders" (
    "id" NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "genres" (
    "id" NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "languages" (
    "id" NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);


CREATE TABLE "transaction_types" (
    "id" NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "transaction_statuses" (
    "id" NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);


CREATE TABLE "reasons" (
    "id" NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "refund_statuses" (
    "id" NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "authors" (
    "id" NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "publishing_houses" (
    "id" NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "users" (
    "id" NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "role_fk" NUMBER NOT NULL,
    "status_fk" NUMBER NOT NULL
);
ALTER TABLE "users" ADD FOREIGN KEY ("role_fk") REFERENCES "roles"("id") ON DELETE CASCADE;
ALTER TABLE "users" ADD FOREIGN KEY ("status_fk") REFERENCES "user_statuses"("id") ON DELETE CASCADE;

CREATE TABLE "pocket" (
    "id" NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "coins" NUMBER(*,2) NOT NULL,
    "user_fk" NUMBER NOT NULL
);
ALTER TABLE "pocket" ADD FOREIGN KEY ("user_fk") REFERENCES "users"("id") ON DELETE CASCADE;

CREATE TABLE "addresses" (
    "id" NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "country" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL
);

CREATE TABLE "personal_data" (
    "dni" VARCHAR(20) PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "birthdate" DATE NOT NULL,
    "dni_type_fk" NUMBER NOT NULL,
    "gender_fk" NUMBER NOT NULL,
    "address_fk" NUMBER NOT NULL,
    "user_fk" NUMBER NOT NULL
);
ALTER TABLE "personal_data" ADD FOREIGN KEY ("dni_type_fk") REFERENCES "dni_types"("id") ON DELETE CASCADE;
ALTER TABLE "personal_data" ADD FOREIGN KEY ("gender_fk") REFERENCES "genders"("id") ON DELETE CASCADE;
ALTER TABLE "personal_data" ADD FOREIGN KEY ("address_fk") REFERENCES "addresses"("id") ON DELETE CASCADE;
ALTER TABLE "personal_data" ADD FOREIGN KEY ("user_fk") REFERENCES "users"("id") ON DELETE CASCADE;

CREATE TABLE "books" (
    "id" NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "author_fk" NUMBER NOT NULL,
    "genre_fk" NUMBER NOT NULL
);
ALTER TABLE "books" ADD FOREIGN KEY("author_fk") REFERENCES "authors"("id") ON DELETE CASCADE;
ALTER TABLE "books" ADD FOREIGN KEY("genre_fk") REFERENCES "genres"("id") ON DELETE CASCADE;



CREATE TABLE "editions" (
    "isbn" VARCHAR(20) PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "publish_date" DATE NOT NULL,
    "number_pages" NUMBER NOT NULL,
    "price"  NUMBER(*,2) NOT NULL,
    "available_units"  NUMBER NOT NULL,
    "front_image" BLOB NOT NULL,
    "back_image"  BLOB NOT NULL,
    "publishing_house_fk" NUMBER NOT NULL,
    "language_fk" NUMBER NOT NULL,
    "book_fk" NUMBER NOT NULL
);
ALTER TABLE "editions" ADD FOREIGN KEY("publishing_house_fk") REFERENCES "publishing_houses"("id") ON DELETE CASCADE;
ALTER TABLE "editions" ADD FOREIGN KEY("language_fk") REFERENCES "languages"("id") ON DELETE CASCADE;
ALTER TABLE "editions" ADD FOREIGN KEY("book_fk") REFERENCES "books"("id") ON DELETE CASCADE;


CREATE TABLE "transactions" (
    "id" NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "transaction_date" DATE NOT NULL,
    "unit_price"  NUMBER(*,2) NOT NULL,
    "number_units"  NUMBER NOT NULL,
    "total" NUMBER(*,2) GENERATED ALWAYS AS ("number_units" * "unit_price") VIRTUAL,
    "user_fk" NUMBER NOT NULL,
    "book_fk" NUMBER NOT NULL,
    "type_fk" NUMBER NOT NULL,
    "status_fk" NUMBER NOT NULL
);
ALTER TABLE "transactions" ADD FOREIGN KEY("user_fk") REFERENCES "users"("id") ON DELETE CASCADE;
ALTER TABLE "transactions" ADD FOREIGN KEY("book_fk") REFERENCES "books"("id") ON DELETE CASCADE;
ALTER TABLE "transactions" ADD FOREIGN KEY("type_fk") REFERENCES "transaction_types"("id") ON DELETE CASCADE;
ALTER TABLE "transactions" ADD FOREIGN KEY("status_fk") REFERENCES "transaction_statuses"("id") ON DELETE CASCADE;



CREATE TABLE "refunds" (
    "id" NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "units_to_refund"  NUMBER NOT NULL,
    "transaction_fk" NUMBER NOT NULL,
    "reason_fk" NUMBER NOT NULL,
    "status_fk" NUMBER NOT NULL
);
ALTER TABLE "refunds" ADD FOREIGN KEY("transaction_fk") REFERENCES "transactions"("id") ON DELETE CASCADE;
ALTER TABLE "refunds" ADD FOREIGN KEY("reason_fk") REFERENCES "reasons"("id") ON DELETE CASCADE;
ALTER TABLE "refunds" ADD FOREIGN KEY("status_fk") REFERENCES "refund_statuses"("id") ON DELETE CASCADE;

