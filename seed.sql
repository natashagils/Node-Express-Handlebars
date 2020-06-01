DROP DATABASE IF EXISTS burgerLog;
CREATE DATABASE burgerLog;
USE burgerLog;
DROP TABLE IF EXISTS burger;
CREATE TABLE burger (
	id INT PRIMARY KEY auto_increment,
    burger_name VARCHAR(30) NOT NULL ,
    devoured BOOLEAN
);
#INSERT INTO burger(burger_name) VALUES ("CHICKEN BURGER");
#INSERT INTO burger(burger_name) VALUES ("fISH BURGER" );
SELECT * FROM burger;
SELECT * FROM burger WHERE devoured = 1;
