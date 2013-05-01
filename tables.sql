Tables

-- CREATE TABLE appts (
--     id serial CONSTRAINT appt_id_pk PRIMARY KEY,
--     apptName text NOT NULL,
--     startDate date NOT NULL,
--     endDate date NOT NULL,
--     weekendsOnly boolean NOT NULL,
--     startTime time NOT NULL,
--     endTime time NOT NULL,
--     apptDuration integer NOT NULL
-- );


-- INSERT INTO events (apptName, startDate, endDate, weekendsOnly, startTime, endTime, apptDuration) VALUES
--     ('Lunch', '3/22/2013', '3/30/2013', 'on', '01:30PM', '03:30PM', 1),
--     ('Dinner', '4/22/2013', '4/30/2013', 'on', '06:30PM', '08:30PM', 1),
--     ('Breakfast', '5/22/2013', '5/30/2013', 'on', '09:30AM', '11:30AM', 1),


CREATE TABLE users (
    id serial CONSTRAINT user_id_pk PRIMARY KEY,
    access_token varchar,
    email varchar
);