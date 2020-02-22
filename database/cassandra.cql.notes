This file is not designed to be "run"
It is for copy/pasting to CQLSH

CREATE KEYSPACE photo WITH replication =
  {'class': 'SimpleStrategy', 'replication_factor' : 1};

CREATE TABLE photo.photos_old(
  photo_url text,
  alt text,
  username text,
  experience_id int,
  PRIMARY KEY (experience_id, photo_url, username)
);

COPY photo.photos (photo_url, alt, username, experience_id) FROM  'tail.csv' WITH DELIMITER=',' AND HEADER=FALSE;

INSERT INTO photo.photos (photo_url, alt, username, experience_id) VALUES ('http', 'alt stuff', 'kraig', 1);

------------------------------------------------------

This alternate schema works, but I was unable to reformat the data to allow import of the 10M records.

CREATE TYPE photo.photo_type (
  photo_url text,
  alt text,
  username text
);

CREATE TABLE photo.photos2(
  experience_id int,
  photo set<frozen<photo_type>>,
  PRIMARY KEY (experience_id)
);


INSERT INTO photo.photos2 (experience_id, photo) VALUES (1, {{photo_url: 'http', alt: 'alt stuff', username: 'kraig'}});

UPDATE photos2 SET photo = photo + {{photo_url: 'ptth', alt: 'stuff alt', username: 'giark'}} WHERE experience_id = 1;
