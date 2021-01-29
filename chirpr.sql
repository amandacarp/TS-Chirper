drop table users;

create table users (
	id int not null auto_increment primary key,
    name varchar(50) not null,
    email varchar(50) not null,
    password text null,
    _created datetime default current_timestamp);
    
    drop table Chirps;

create table Chirps (
	id int not null auto_increment primary key,
    userid int not null, 
    content varchar(50) not null,
    location varchar(50) not null,
    _created datetime default current_timestamp);
    
    alter table Chirps
add constraint fk_user
foreign key (userid)
references users(id);


select 
	c.content,
    u.name
from Chirps c
join users u on u.id = c.userid;

drop table Mentions;
create table Mentions(
	chirpid int not null,
    userid int not null,
    foreign key (chirpid) references Chirps(id),
    foreign key (userid) references users(id));
    
CREATE USER 'chirprapp'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON chirpr. * TO 'chirprapp'@'localhost';

select * from Chirps;
select * from users;

INSERT INTO Chirps (userid, content, location) VALUES (1, '@Alex sup', 'LA');
INSERT INTO Chirps (userid, content, location) VALUES (2, '@Amanda Hey', 'LA');
INSERT INTO Chirps (userid, content, location) VALUES (1, '@Alex sup', 'LA');

INSERT INTO Mentions (chirpid, userid) VALUES (9, 4);
INSERT INTO Mentions (chirpid, userid) VALUES (10, 1);
INSERT INTO Mentions (chirpid, userid) VALUES (32, 1);
INSERT INTO Mentions (chirpid, userid) VALUES (33, 2);

SELECT * from Mentions

SELECT * from Chirps
SELECT * from users

delimiter //
CREATE PROCEDURE spUserMentions(userid int)
BEGIN
	SELECT id, content, _created FROM Chirps
    JOIN Mentions m ON id = m.chirpid
    WHERE m.userid = userid;
    END //
    delimiter ; 
    
CALL spUserMentions(2)