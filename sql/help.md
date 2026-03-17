# Commands

#### Login in container with db
```sh
docker exec -it task-db bash
```

#### Login in postgres
```sh
psql -U postgres -d taskdb
```

### Postgres
```sh
## show databases
\l
## connect to db
\c {db name}
## show tables
\dt
## quit
\q
```


### Reach psql

#### from app container

```sh
docker exec -it task-app /bin/ash
apk --update add postgresql-client
psql -h db -p 5432 -d taskdb -U postgres
```

#### from postgres container

```sh
docker exec -it task-db bash
psql -h db -p 5432 -d taskdb -U postgres
```
