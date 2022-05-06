## Usual commands:

* db-migrate create <table_name>-table --sql-file
* db-migrate up
* db-migrate down
* docker-compose up
* docker container ls -a
* docker-compose run --rm postgres psql -h <container_id> -U <db_user> -d <db_name>