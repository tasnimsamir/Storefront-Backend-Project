## Usual commands:

* db-migrate create <table_name>-table --sql-file
* db-migrate up
* db-migrate down
* docker-compose up
* docker container ls -a
* docker-compose run --rm postgres psql -h <container_id> -U <db_user> -d <db_name>



* **Migrations: version control of database.**

* Difference between data migration & schema migration..

* **Object Relation Mapping(ORM):** To write my sql queries with a typescript code.

* export class UserStore {} >> *interface* to interact with sql queries & DB in typescript for users table.

* difference between hashing and encryption:
    * encryption: two-way straight(encryption/dycryption) with a key
    * hashing: one way (more secure and powerful)

* sql update queries >> COALESCE (if the value is null take the backup values)

* Q: how we apply MVC here?
