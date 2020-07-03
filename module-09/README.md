# Docker Commands

## Postgres
```bash
$ sudo docker run \
    --name postgres_nodebr \
    -e POSTGRES_USER=lucasfranca \
    -e POSTGRES_PASSWORD=lucasfranca \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres
```

## Adminer - Client para o Postgres
```bash
$ sudo docker run \
    --name adminer_nodebr \
    -p 8080:8080 \
    --link postgres_nodebr:postgres_nodebr \
    -d \
    adminer
```

## MongoDB
```bash
$ sudo docker run \
    --name mongodb_nodebr \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=admin \
    -d \
    mongo:4
```

## Client MongoDB
```bash
$ sudo docker run \
    --name mongoclient_nodebr \
    -p 3000:3000 \
    --link mongodb_nodebr:mongodb_nodebr \
    -d \
    mongoclient
```

### Criando um banco de dados MongoDB por linha de comando:
```bash
$ sudo docker exec -it mongodb_nodebr \
    mongo --host localhost -u admin -p admin --authenticationDatabase admin \
    --eval "db.getSiblingDB('heroes').createUser({user: 'lucasfranca', pwd: 'lucasfranca', roles: [{role: 'readWrite', db: 'heroes'}]})"
```
