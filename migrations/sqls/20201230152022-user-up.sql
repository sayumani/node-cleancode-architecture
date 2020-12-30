/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS user_app (
	id_user_app SERIAL PRIMARY KEY,
	user_name VARCHAR ( 50 ) UNIQUE NOT NULL,
	nick_name VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	mobile VARCHAR ( 255 ) UNIQUE NOT NULL,
	age INTEGER NOT NULL
);