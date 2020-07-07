<p align="center">
    <a href="https://treinamento.nodebr.org/">
        <img src="../public/nodebr-1.png" alt="NodeBR"/>
    </a>
</p>

<p align="center">
    <h1 align="center">
        Imersão em desenvolvimento de APIs com Node.js, By #NodeBR!
    </h1>
</p>

<p align="center">
  <a href="#-inicie-com-docker-compose">🐳 Inicie com Docker-compose</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-inicie-com-npm-e-docker-run">📦 Inicie com NPM e Docker</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-acessando-os-bancos-de-dados-mongodb-e-postgres-via-browser">💻 Acessando os BD's via browser</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#%EF%B8%8F-acessando-os-bancos-de-dados-mongodb-e-postgres-via-terminal">⌨️ Via terminal</a>
</p>


## 🐳 Inicie com Docker-compose
Para iniciar o App com Docker-compose (*Você precisa ter o Docker e o Docker-compose instalados para continuar. Caso contrário, você pode baixá-los através deste link: https://www.docker.com/*), em um terminal execute os seguintes comandos:

```bash
$ git clone https://github.com/lucasfrancaid/CursoNodeBR.git
$ cd CursoNodeBR
$ sudo docker-compose up -d
```
A partir desse momento, os contêineres Server, DB e Web serão iniciados, e o aplicativo estará disponível nas seguintes URLs:
- <b>Aplicação:</b> http://localhost:3333/documentation
- <b>Cobertura de testes:</b> http://localhost:3333/coverage/
- <b>Adminer (Client do Postgres):</b> http://localhost:8080/
- <b>Mongoclient (Client do MongoDB):</b> http://localhost:3000/

Mas a aplicação ainda não está funcionando, agora será necessário executar alguns comandos para acessarmos os bancos de dados e criar alguns itens, para isso, você pode seguir o passo a passo em um dos links abaixo: 
- <a href="#-acessando-os-bancos-de-dados-mongodb-e-postgres-via-browser">💻 Acessando os BD's via browser</a>
- <a href="#-acessando-os-bancos-de-dados-mongodb-e-postgres-via-terminal">⌨️ Acessando os BD's via terminal</a>

<br/>

## 📦 Inicie com NPM e Docker Run
Para iniciar o App com NPM, em um terminal você deve clonar o repositório e executar o npm install:
```bash
$ git clone https://github.com/lucasfrancaid/CursoNodeBR.git
$ cd CursoNodeBR
$ npm install
```

## Inicie os bancos de dados com Docker Run:
Para iniciar o App com Docker (*Você precisa ter o Docker instalado para continuar. Caso contrário, você pode baixá-los através deste link: https://www.docker.com/*).

Postgres:
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

Adminer - Client para o Postgres:
```bash
$ sudo docker run \
    --name adminer_nodebr \
    -p 8080:8080 \
    --link postgres_nodebr:postgres_nodebr \
    -d \
    adminer
```

MongoDB:
```bash
$ sudo docker run \
    --name mongodb_nodebr \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=admin \
    -d \
    mongo:4
```

Mongoclient - Client para o MongoDB:
```bash
$ sudo docker run \
    --name mongoclient_nodebr \
    -p 3000:3000 \
    --link mongodb_nodebr:mongodb_nodebr \
    -d \
    mongoclient/mongoclient
```

<br/>

## 💻 Acessando os bancos de dados MongoDB e Postgres via browser

Acessando o banco de dados MongoDB com mongoclient:
- *Antes de acessar o caminho do client, execute o seguinte comando no terminal para criar a db Heroes:*
```bash
$ sudo docker exec -it mongodb_nodebr \
    mongo --host localhost -u admin -p admin --authenticationDatabase admin \
    --eval "db.getSiblingDB('heroes').createUser({user: 'lucasfranca', pwd: 'lucasfranca', roles: [{role: 'readWrite', db: 'heroes'}]})"
```

- Após executar o comando, acesse o <a href="http://localhost:3000">Mongo Client</a>
*Atenção: Utilize CTRL+Clique (para abrir em outra aba)*
- Crie uma conexão de acesso com as seguintes configurações:
```txt
Connection:
- Connection name: mongodb-readWrite
- Host: mongodb
- Port: 27017
- Database Name: heroes

Authentication:
- Authentication Type: Scram-Sha-1
- Username: lucasfranca
- Password: lucasfranca
- Authentication DB: heroes
```
- Salve a conexão, clique na conexão que foi criada e clique em connect

<br/>

Acessando o banco de dados Postgres com Adminer:
- Acesse o <a href="http://localhost:8080">Adminer</a>
*Atenção: Utilize CTRL+Clique (para abrir em outra aba)*
- Faça o login com as seguintes configurações:
```txt
- Sistema: PostgreSQL
- Servidor: postgres_nodebr
- Usuário: lucasfranca
- Senha: lucasfranca
- Banco de dados: heroes
```

#

## ⌨️ Acessando os bancos de dados MongoDB e Postgres via terminal

Criando o banco de dados MongoDB:
```bash
$ sudo docker exec -it mongodb_nodebr \
    mongo --host localhost -u admin -p admin --authenticationDatabase admin \
    --eval "db.getSiblingDB('heroes').createUser({user: 'lucasfranca', pwd: 'lucasfranca', roles: [{role: 'readWrite', db: 'heroes'}]})"
```

Acessando o banco de dados do MongoDB:
```bash
$ sudo docker exec -it mongodb_nodebr \
    mongo -u lucasfranca -p lucasfranca --authenticationDatabase heroes
```
Criando Heróis no MongoDB:
```bash
> use heroes
> for (let i = 0; i <= 5; i++) {
    db.heroes.insert({
        name: `Clone-${i}`,
        skill: 'Multiclone',
        birthday: '1980-01-01'
    })
};
```
*Para sair do container use CTRL+d*

#

Acessando o banco de dados do Postgres:
```bash
$ sudo docker exec -it postgres_nodebr \
    psql --host=postgres --dbname=heroes --username=lucasfranca
```
*A senha é: lucasfranca*

Criando a tabela Heroes no Postgres:
```bash
DROP TABLE IF EXISTS TB_HEROES; 
CREATE TABLE TB_HEROES (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NAME TEXT NOT NULL,
    SKILL TEXT NOT NULL
);
```

Criando Heróis no Postgres:
```bash
INSERT INTO TB_HEROES (NAME, SKILL)
VALUES
    ('Flash', 'Speed'),
    ('Batman', 'Money'),
    ('Superman', 'Supervision');
```
*Para sair do container use CTRL+d*

<br/>

Heróis criados em ambos bancos de dados, agora é hora de usar nossa aplicação, execute os seguintes comando em seu terminal:
```bash
$ sudo docker-compose stop
$ sudo docker-compose up -d
```

*Os testes irão rodar e o dever deles é passar rsrs. Acesse a aplicação no seguinte caminho <a href="http://localhost:3333/documentation">http://localhost:3333/documentation</a> e seja feliz!*
