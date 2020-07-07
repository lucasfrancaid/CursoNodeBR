[![LinkedIn][linkedin-shield]][linkedin-url]

<p align="center">
    <a href="https://treinamento.nodebr.org/">
        <img src="public/nodebr-1.png" alt="NodeBR"/>
    </a>
</p>

<p align="center">
    <h1 align="center">
        Imersão em desenvolvimento de APIs com Node.js, By #NodeBR!
    </h1>
</p>

<p align="center">
    API Auth e Heroes com Swagger:
    <br/>
    <a href="https://cursonodebr-study.herokuapp.com/documentation"><strong>https://cursonodebr-study.herokuapp.com/documentation</strong></a>
</p>

<p align="center">
    Cobertura de testes do app com Istanbul.js:
    <br/>
    <a href="https://cursonodebr-study.herokuapp.com/coverage/"><strong>https://cursonodebr-study.herokuapp.com/coverage/</strong></a>
</p>

<p align="center">
    Saiba como executar este projeto em sua máquina local:
    <br/>
    <a href="./module-12/README.md"><strong>Documentação</strong></a>
</p>

## 💻 Tecnologias:

* [Node.js](https://nodejs.org/)
* [Mocha](https://mochajs.org/)
* [Nock](https://www.npmjs.com/package/nock)
* [Commander](https://www.npmjs.com/package/commander)
* [Docker](https://www.docker.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [MongoDB](https://www.mongodb.com/)
* [Sequelize](https://sequelize.org/)
* [Mongoose](https://mongoosejs.com/)
* [Hapi](https://hapi.dev/)
* [Joi](https://hapi.dev/module/joi/)
* [Boom](https://hapi.dev/module/boom/)
* [Vision](https://hapi.dev/module/vision/)
* [Inert](https://hapi.dev/module/inert/)
* [Swagger](https://www.npmjs.com/package/hapi-swagger)
* [Hapi-Auth-Jwt2](https://www.npmjs.com/package/hapi-auth-jwt2)
* [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Cross-env](https://www.npmjs.com/package/cross-env)
* [Heroku](https://www.heroku.com/)
* [PM2](https://pm2.keymetrics.io/)
* [Istanbul](https://istanbul.js.org/)

<br/>

## 🚀 Utilizando a API:
- Para utilizar a API <a href="https://cursonodebr-study.herokuapp.com/documentation#/login/postLogin"><b>Clique Aqui</b></a> *Atenção: Utilize CTRL+Clique (para abrir em outra aba)*
- Com a página aberta, clique em *Try out* e substitua o conteúdo de body com o seguinte json:
```json
{
  "username": "admin",
  "password": "123"
}
```
- Logo abaixo, clique em executar, após a execução desça um pouco a página e você vai encontrar o campo *Response body*:
```json
{
    "token": "AquiTeraUmTokenQueVoceIraCopiar"
}
```
- Copie o corpo do token presente no *Response body*, depois acesse qualquer uma das rotas de *Heroes*, que estaram disponíveis ao subir a página
- Cole o token copiado dentro do campo *authorization* na rota escolhida e clique em *Execute*
- A partir daí, utilize esse token para testar as rotas que desejar 😎

<br/>

#

<p align="center">
    <h1 align="center">
        Conteúdo do curso, módulos e anotações
    </h1>
</p>

## 📖 Sumário:

00. <a href="#introdução---módulo-00"> Introdução </a>
01. <a href="#sincronia-de-funções-javascript---módulo-01"> Sincronia de funções Javascript </a>
02. <a href="#manipulação-de-listas---módulo-02"> Manipulação de listas </a>
03. <a href="#introdução-a-desenvolvimento-de-testes-automatizados-em-javascript---módulo-03"> Introdução a desenvolvimento de testes automatizados em Javascript </a>
04. <a href="#nodejs-além-da-web---criando-ferramentas-de-linha-de-comando---módulo-04"> Node.js além da Web - Criando ferramentas de linha de comando </a>
05. <a href="#bancos-de-dados---nosso-projeto-multi-banco-de-dados---módulo-05"> Bancos de Dados - Nosso projeto Multi-banco de dados </a>
06. <a href="#introdução-ao-postgres-e-bancos-relacionais---módulo-06"> Introdução ao Postgres e Bancos Relacionais </a>
07. <a href="#introdução-ao-mongodb-e-bancos-não-relacionais-nosql---módulo-7"> Introdução ao MongoDB e Bancos Não-Relacionais (NoSQL) </a>
08. <a href="#refatorando-nosso-projeto-para-bancos-de-dados-multi-schemas---módulo-8"> Refatorando nosso projeto para bancos de dados multi-schemas </a>
09. <a href="#nodejs-e-web-services---criando-serviços-profissionais-com-hapijs---módulo-9"> Node.js e Web Services - Criando serviços profissionais com Hapi.js </a>
10. <a href="#documentação-de-serviços-com-swagger---módulo-10"> Documentação de Serviços com Swagger </a>
11. <a href="#autenticação-com-json-web-token---módulo-11"> Autenticação com JSON Web Token </a>
12. <a href="#publicação-de-serviços-na-web---módulo-12"> Publicação de serviços na Web </a>

#

## Introdução - Módulo 00

### O que não é Node.js:
- Não é uma linguagem de programação, a linguagem é Javascript.
- Ferramenta para criação de sites simples.
- Um framework Javascript.
- Ferramenta para criação de aplicações front-end.

### O que é Node.js:
- Plataforma para construção de aplicações Backend usando Javascript.
- Usado para construção de ferramentas de linha de comando

### NPM (Node Package Manager):
- Gerenciador de dependências Javascript
- Identifica dependências a paritr do package.json


### Iniciando um projeto Node.js:
```bash
$ npm init || npm init -y
```

#

## Sincronia de funções Javascript - Módulo 01

### Trabalhando com Callbacks:
```js
function getAddress(userId, callback) {
    setTimeout(() => {
        return callback(null, {
            street: 'Av Node',
            number: 100
        })
    }, 2000)
};
```

<br/>

### Introdução a Promises:
- Pending, estado inicial, ainda não foi resolvida
- Fulfilled, quando executa todas as operações com sucesso
- Rejected, quando a operação falha

```js
function getPhone(userId) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                phone: '923233029',
                ddd: '12'
            })
        }, 2000);
    });
};
```

### Convertendo funções callback em Promise com promisefy:
```js
const util = require('util');
const getAddressAsync = util.promisify(getAddress)
        const address = getAddressAsync(res.user.id)
```

<br/>

### Introdução a Promises com async/await:
- Facilita a visualização do fluxo de funções
- Não altera a performance de sua aplicação
- Usar apenas quando necessitar tratar a resposta da chamada

### Usando async/await:
```js
main()
async function main() {
    try {
        const user = await getUser()
        const phone = await getPhone(user.id)
        const address = await getAddressAsync(user.id)
        ...
    } catch (err) {
        console.error('Error', err)
    };
};
// Time: 5008.751ms
```

### Melhoria de performance com Promise.all:
```js
main()
async function main() {
    try {
        const user = await getUser()
        const result = await Promise.all([
            getPhone(user.id),
            getAddressAsync(user.id)
        ])
        const phone = result[0]
        const address = result[1]
        ...
    } catch (err) {
        console.error('Error', err)
    };
};
// Time: 3005.730ms
```

<br/>

### Introdução à manipulação de eventos com EventEmitter:
- Usado para ações contínuas
- Node.js usa para quase tudo em seu ecossistema
- Bastante usado também nos browsers (.onClick)
- Trabalha sob o Design Pattern Observer/PubSub

### Trabalhando com Eventos com a classe EventEmitter:
```js
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {

}

const myEmitter = new MyEmitter()
const eventName = 'user:click'

myEmitter.on(eventName, (click) => {
    console.log('User clicked', click)
})
```

#

## Manipulação de listas - Módulo 02

### Manipulando listas com For/ForIn/ForOf

### Usando For:
```js
async function main() {
    try {
        const result = await service.getPeople('a')
        const names = []

        for (let i = 0; i <= result.results.length - 1; i++) {
            const person = result.results[i]
            names.push(person.name)
        }
        
        ...
}
// Time: 0.178ms
```

### Usando ForIn:
```js
async function main() {
    try {
        const result = await service.getPeople('a')
        const names = []

        for (let i in result.results) {
            const person = result.results[i]
            names.push(person.name)
        }
        
        ...
}
// Time: 0.043ms
```

### Usando ForOf:
```js
async function main() {
    try {
        const result = await service.getPeople('a')
        const names = []

        for (person of result.results) {
            names.push(person.name)
        }
        
        ...
}
// Time: 0.050ms
```

<br/>

### Criando nosso próprio Array.Map:
```js
Array.prototype.myMap = function (callback) {
    const newArrayMapped = []
    for (let index = 0; index <= this.length - 1; index++) {
        const result = callback(this[index], index)
        newArrayMapped.push(result)
    }
    return newArrayMapped;
};
```

### Criando nosso próprio Array.Filter:
```js
Array.prototype.myFilter = function (callback) {
    const list = []
    for (index in this) {
        const item = this[index]
        const result = callback(item, index, this)
        if (!result) continue;
        list.push(item)
    }
    return list;
};
```

#

## Introdução a desenvolvimento de testes automatizados em Javascript - Módulo 03

### Instalando o Mocha:
```bash
$ sudo npm install -g mocha
$ npm install -D mocha
```

### Primeira implementção de teste:
```js
const assert = require('assert');
const { getPeople } = require('../service');

describe('Star Wars Tests', function () {
    it('should search the R2-D2 with correct format', async () => {
        const expected = [{
            name: 'R2-D2',
            height: '96'
        }]
        const baseName = 'r2-d2'
        const result = await getPeople(baseName)

        assert.deepEqual(result, expected)
    });
});
```

### Executando o primeiro teste:
```bash
$ mocha test.js
```

### Instalando Nock para simular requisições:
```bash
$ npm install nock
```

### Mockando uma requisição com Nock:
```js
describe('Star Wars Tests', function () {
    this.beforeAll(() => {
        const response = {
            "count":1,
            "next":null, 
            "previous":null,
            "results":[
                {
                    "name":"R2-D2",
                    "height":"96",
                    ...
                }
            ]
        }

        nock('https://swapi.dev/api/people')
            .get('/?search=r2-d2&format=json')
            .reply(200, response)
    });
    ...
};
```

#

## Node.js além da Web - Criando ferramentas de linha de comando - Módulo 04

### Manipulando arquivos - READ:
```js
async list(id) {
    const data = await this.getFileData()
    const filteredData = data.filter(item => id ? item.id === id : true)
    return filteredData;
};
```

### Manipulando arquivos - CREATE:
```js
async create(hero) {
    const data = await this.getFileData()
    const id = hero.id <= 2 ? hero.id : Date.now()
    const heroWithId = { id, ...hero }
    
    const updatedData = [
        ...data,
        heroWithId
    ]

    const result = await this.writeFile(updatedData)
    return result;
};
```

### Manipulando arquivos - DELETE:
```js
async remove(id) {
    if (!id) {
        return await this.writeFile([]);
    };

    const data = await this.getFileData()
    const index = data.findIndex(item => item.id === parseInt(id))

    if (index === -1) {
        throw Error('Hero not exist')
    };
    
    data.splice(index, 1)
    return await this.writeFile(data)
};
```

### Manipulando arquivos - UPDATE:
```js
async update(id, modifications) {
    const data = await this.getFileData()
    const index = data.findIndex(item => item.id === parseInt(id))

    if (index === -1) {
        throw Error('Hero not exist')
    };

    const current = data[index]
    const updatedHero = {
        ...current,
        ...modifications
    }
    
    data.splice(index, 1)

    return await this.writeFile([
        ...data,
        updatedHero
    ]);
};
```

<br/>

### Criando ferramentas de linha de comando:

### Instalando o Commander:
```bash
$ npm install commander
```

### Criando as funções com Commander:
```js
async function main() {
    Commander
        .version('v1')
        .option('-n, --name [value]', 'Hero name')
        .option('-s, --skill [value]', 'Hero skill')
        .option('-i, --id [value]', 'Hero id')

        .option('-c, --create', 'Create a hero')
        .option('-l, --list', 'List of heroes')
        .option('-r, --remove [value]', 'Remove a hero by id')
        .option('-u, --update [value]', 'Update a hero by id')
        .parse(process.argv)
    ...
};
```

### Criando os métodos:
```js
    const hero = new Hero(Commander)

    try {
        if (Commander.create) {
            delete hero.id
            const result = await database.create(hero)
            if (!result) {
                console.error('Hero could not created!')
                return;
            };
            console.log('Hero was created!')
        };

        if (Commander.list) {
            const result = await database.list()
            console.log(result)
            return;
        };

        if (Commander.remove) {
            const result = await database.remove(hero.id)
            if (!result) {
                console.error('Hero could not removed!')
                return;
            };
            console.log('Hero was deleted!')
        };

        if (Commander.update) {
            const updateId =  parseInt(Commander.update)
            const data = JSON.stringify(hero)
            const updateHero = JSON.parse(data)

            const result = await database.update(updateId, updateHero)
            if (!result) {
                console.error('Hero could not updated!')
                return;
            };

            console.log('Hero was updated!')
        };
     ...
};
```

#

## Bancos de Dados - Nosso projeto Multi-banco de dados - Módulo 05

### Trabalhando com o Design Pattern Strategy para Multi DataSources:
- Foram criados os bancos de dados utilizando docker (<a href="module-05/README.md">Veja aqui</a>)
- Banco de Dados NoSQL: MongoDB
- Banco de Dados SQL: Postgres


```bash
.
├── package.json
├── README.md
└── src
    ├── db
    │   └── strategies
    │       ├── base
    │       │   └── contextStrategy.js
    │       ├── interfaces
    │       │   └── interfaceCrud.js
    │       ├── mongodb.js
    │       └── postgres.js
    └── index.js
```

### Chamada de contexto de banco de dados usando strategy:
```js
const ContextStrategy = require('./db/strategies/base/contextStrategy');

const MongoDB = require('./db/strategies/mongodb');
const Postgres = require('./db/strategies/postgres');

const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create();

const contextPostgres = new ContextStrategy(new Postgres());
contextPostgres.create();
```

#

## Introdução ao Postgres e Bancos Relacionais - Módulo 06

### Bancos Relacionais:
- Estruturas fixas
- Chaves estrangeiras e constraints
- Consistente

### Operadores e conexão:
```sql
DROP TABLE IF EXISTS TB_HEROES; 
CREATE TABLE TB_HEROES (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NAME TEXT NOT NULL,
    SKILL TEXT NOT NULL
)

--create
INSERT INTO TB_HEROES (NAME, SKILL)
VALUES
    ('Flash', 'Speed'),
    ('Batman', 'Money'),
    ('Superman', 'Supervision')

--read
SELECT * FROM TB_HEROES;
SELECT * FROM TB_HEROES WHERE NAME = "Flash";

--update
UPDATE TB_HEROES
SET NAME = 'Goku', SKILL = 'Super sayajin'
WHERE ID = 1;

--delete
DELETE FROM TB_HEROES WHERE ID = 2;
```

### Trabalhando com Sequelize:
```bash
$ npm install sequelize pg-hstore pg
```

### Configurando a conexão com o Postgres:
```js
const Sequelize = require('sequelize');

const ICrud = require('./interfaces/interfaceCrud');

class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._heroes = null
        this._connect()
    };

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true;
        } catch (error) {
            console.log('Fail!', error)
            return false;
        };
    };

    async defineModel() {
        this._heroes = driver.define('heroes', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                required: true
            },
            skill: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROES',
            freezeTableName: false,
            timestamps: false
        });
    
        await this._heroes.sync()
    };

    _connect() {
        this._driver = new Sequelize(
            'heroes',
            'lucasfranca',
            'lucasfranca',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false
            }
        );
    };
    ...
};
```

### Criando o teste da conexão:
```js
const assert = require('assert');

const Postgres = require('../db/strategies/postgres');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new Postgres())

describe('Postgres strategy', function () {
    this.timeout(Infinity);

    it('Postgres Connection', async function () {
        const result = await context.isConnected()
        assert.equal(result, true)
    });
});
```

### Cadastrando Heróis - CREATE:
```js
async create(item) {
    const { dataValues } = await this._heroes.create(item)
    return dataValues;
};
```

### Listando Heróis - READ:
```js
read(item = {}) {
    return this._heroes.findAll({ where: item, raw: true })
};
```

### Atualizando Heróis - UPDATE:
```js
async update(id, item) {
    return await this._heroes.update(item, { where: { id: id } })
};
```

### Removendo Heróis - DELETE:
```js
async delete(id) {
    const query = id ? { id } : {}
    return await this._heroes.destroy({ where: query })
};
```

#

## Introdução ao MongoDB e Bancos Não-Relacionais (NoSQL) - Módulo 7

### Bancos Não Relacionais:
- Estruturas dinâmicas e flexíveis
- Lembra programação orientada a objetos
- Eventualmente consistente

### Operadores e conexão:
```bash
$ sudo docker exec -it mongodb_nodebr \
    mongo -u lucasfranca -p lucasfranca --authenticationDatabase heroes
> show dbs
> use heroes
> show collections
```
### Executando comandos para o MongoDB via terminal:
```js
// Finding documents
db.heroes.find()

// Finding with better format
db.heroes.find().pretty()

// MongoDB allows run javascript
for (let i = 0; i <= 10; i++) {
    db.heroes.insert({
        name: `Clone-${i}`,
        skill: 'Speed',
        birthday: '1996-03-10'
    })
};

// Count documents in database
db.heroes.count()

// Return the first document found
db.heroes.findOne()

// Return a limit of 5 document and sort by desc name
db.heroes.find().limit(5).sort({ name: -1 })

/*-------MongoDB Methods-------*/

// create
db.heroes.insert({
    name: 'Flash',
    skill: 'Speed',
    birthday: '1996-03-10'
})

// read
db.heroes.find()

// update
db.heroes.update(
    { _id: ObjectId("5efdf028459421617399d408") },
    { $set: { name: 'Batman' } }
)

// delete
db.heroes.remove({}) // remove all
db.heroes.remove({ name: 'Clone-10' }) // remove with where
```

### Trablhando com Mongoose:
```bash
$ npm install mongoose
```

### Configurando a conexão com o MongoDB:
```js
const Mongoose = require('mongoose');

const ICrud = require('./interfaces/interfaceCrud');

const STATUS = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
};

class MongoDB extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._heroes = null
    };

    async isConnected() {
        const state = STATUS[this._driver.readyState]
        if (state !== 'Connecting') return state;
        await new Promise(resolve => setTimeout(resolve, 1000))
        return STATUS[this._driver.readyState]
    };

    defineModel() {
        const schema = new Mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            skill: {
                type: String,
                required: true
            },
            created_at: {
                type: Date,
                default: new Date()
            }
        });
        
        this._heroes = Mongoose.model('heroes', schema)
    };

    connect() {
        Mongoose.connect(
            'mongodb://lucasfranca:lucasfranca@localhost:27017/heroes',
            { 
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            (error) => {
                if (!error) return;
                console.log('Connection failed!', error)
            },
        );

        this._driver = Mongoose.connection
        this._driver.once('open', () => console.log('Running database!'))
    };
    ...
};
```

### Criando o teste da conexão:
```js
const assert = require('assert');

const MongoDB = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new MongoDB())

describe('MongoDB strategy', function () {
    this.beforeAll(async function () {
        await context.connect()
    });

    it('MongoDB Connection', async function () {
        const result = await context.isConnected()
        const expected = 'Connected'
        assert.equal(result, expected)
    });
});
```

### Cadastrando Heróis - CREATE:
```js
create(item) {
    return this._heroes.create(item)
};
```

### Listando Heróis - READ:
```js
read(item, skip = 0, limit = 10) {
    return this._heroes.find(item).skip(skip).limit(limit)
};
```

### Atualizando Heróis - UPDATE:
```js
update(id, item) {
    return this._heroes.updateOne({ _id: id }, item)
};
```

### Removendo Heróis - DELETE:
```js
delete(id) {
    return this._heroes.deleteOne({ _id: id })
};
```

#

## Refatorando nosso projeto para bancos de dados multi-schemas - Módulo 8

### Refatorando a estratégia de MongoDB para multi-schemas:
```bash
.
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── db
    │   └── strategies
    │       ├── base
    │       │   └── contextStrategy.js
    │       ├── interfaces
    │       │   └── interfaceCrud.js
    │       ├── mongodb
    │       │   ├── index.js
    │       │   └── schemas
    │       │       └── heroesSchema.js
    │       └── postgres.js
    ├── index.js
    ├── mongodbExample.js
    ├── postgresExample.js
    ├── scripts
    │   ├── mongodb.js
    │   └── postgres.sql
    └── tests
        ├── mongodbStrategy.test.js
        └── postgresStrategy.test.js
```

### Refatorando a estratégia de Postgres para multi-schemas:
```bash
.
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── contextExample.js
    ├── db
    │   └── strategies
    │       ├── base
    │       │   └── contextStrategy.js
    │       ├── interfaces
    │       │   └── interfaceCrud.js
    │       ├── mongodb
    │       │   ├── index.js
    │       │   └── schemas
    │       │       └── heroesSchema.js
    │       └── postgres
    │           ├── index.js
    │           └── schemas
    │               └── heroesSchema.js
    ├── mongodbExample.js
    ├── postgresExample.js
    ├── scripts
    │   ├── mongodb.js
    │   └── postgres.sql
    └── tests
        ├── mongodbStrategy.test.js
        └── postgresStrategy.test.js
```

#

## Node.js e Web Services - Criando serviços profissionais com Hapi.js - Módulo 9

### Conhecendo o módulo HTTP:
```js
const http = require('http');

const PORT = 3333;

http.createServer((request, response) => {
    response.end('Hello Node!')
})
.listen(PORT, () => console.log(`Listening on port ${PORT}!`))
```

### Instalando Hapi.js:
```bash
$ npm install @hapi/hapi
```

### Criando a estrutura para criação de APIs com Hapi.js:
```js
const Hapi = require('hapi');

const Context = require('../db/strategies/base/contextStrategy');
const MongoDB = require('../db/strategies/mongodb');
const HeroesSchema = require('../db/strategies/mongodb/schemas/heroesSchema');
const HeroesRoutes = require('../routes/heroesRoutes');

const app = new Hapi.Server({
    port: 3333
});

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]());
};

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroesSchema))

    app.route([
        ...mapRoutes(new HeroesRoutes(context), HeroesRoutes.methods())
    ])

    await app.start()
    console.log('Listening on port', app.info.port)

    return app;
};

module.exports = main();
```

### Implementando rotas automatizadas:
```js
// src/routes/base/baseRoute.js

class BaseRoute {
    static methods() {
        return Object.getOwnPropertyNames(this.prototype)
            .filter(method => method !== 'constructor' && !method.startsWith('_'))
    };
};

module.exports = BaseRoute;
```

```js
// src/routes/heroesRoutes.js

const BaseRoute = require('./base/baseRoute');

class HeroesRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    };

    list() {
        return {
            path: '/heroes',
            method: 'GET',
            handler: (request, headers) => {
                return this.db.read()
            }
        };
    };
};

module.exports = HeroesRoutes;
```

### Entendendo o padrão RESTful para desenvolvimento de APIs:
- Stateless
- Dados de clientes são armazenados em seus respectivos navegadores
- Em geral retornam JSON

### Métodos HTTP:
- GET: Obter dados de um recurso
- POST: Criar item de um recurso
- PUT: Atualizar um recurso com uma nova representação
- PATCH: Atualizar um recurso parcialmente
- DELETE: Remover um recurso

### Padrões de URL:
- GET: /heroes
- POST: /heroes
- PUT: /heroes/:id -> body: { name, skill, date }
- PATCH: /heroes/:id -> body: { name }
- DELETE: /heroes/:id
- GET: /heroes/:id
- GET: /heroes/:id/headquarters
- GET: /heroes/:id/headquarters/:id

### Listando Heróis - GET:
```js
list() {
    return {
        path: '/heroes',
        method: 'GET',
        handler: (request, headers) => {
            try {
                const { skip, limit, name } = request.query
                let query = {}
                
                if (name) query.name = name
                if (isNaN(skip)) throw Error('Type of skip is incorrect')
                if (isNaN(limit)) throw Error('Type of limit is incorrect')

                return this.db.read(query, parseInt(skip), parseInt(limit))
            } catch (error) {
                console.error('Error', error)
                return 'Intern server error!'
            }
        }
    };
};
```

### Listando Heróis - Validando requisições com Joi:
```bash
$ npm install @hapi/joi
```
```js
list() {
    return {
        path: '/heroes',
        method: 'GET',
        config: {
            validate: {
                failAction: (request, headers, error) => {
                    throw error;
                },
                query: {
                    skip: Joi.number().integer().default(0),
                    limit: Joi.number().integer().default(10),
                    name: Joi.string().min(2).max(50)
                }
            }
        },
        handler: (request, headers) => {
            try {
                const { skip, limit, name } = request.query
                const query = name ? { name: { $regex: `.*${name}*.` } } : {}
                return this.db.read(query, skip, limit)
            } catch (error) {
                console.error('Error', error)
                return 'Intern server error!'
            }
        }
    };
};
```

### Cadastrando Heróis - POST:
```js
create() {
    return {
        path: '/heroes',
        method: 'POST',
        config: {
            validate: {
                failAction,
                payload: {
                    name: Joi.string().required().min(3).max(100),
                    skill: Joi.string().required().min(2).max(20)
                }
            }
        },
        handler: async (request) => {
            try {
                const { name, skill } = request.payload
                return await this.db.create({ name, skill })
            } catch (error) {
                console.error('Error', error)
                return 'Internal server error!'
            }
        }
    };
};
```

### Atualizando Heróis - PATCH / PUT:
```js
update() {
    return {
        path: '/heroes/{id}',
        method: 'PATCH',
        config: {
            validate: {
                failAction,
                params: {
                    id: Joi.string().required()
                },
                payload: {
                    name: Joi.string().min(3).max(100),
                    skill: Joi.string().min(2).max(20)
                }
            }
        },
        handler: async (request) => {
            try {
                const { id } = request.params
                const stringData = JSON.stringify(request.payload)
                const data = JSON.parse(stringData)
                
                const result = await this.db.update(id, data)

                if (result.nModified !== 1) return { statusCode: result.statusCode, message: 'Hero could not updated!' };
                return { statusCode: result.statusCode, message: 'Hero was updated!' }

            } catch (error) {
                console.error('Error', error)
                return 'Internal server error!'
            }
        }
    }
};
```

### Removendo Heróis - DELETE:
```js
delete() {
    return {
        path: '/heroes/{id}',
        method: 'DELETE',
        config: {
            validate: {
                failAction,
                params: {
                    id: Joi.string().required()
                }
            }
        },
        handler: async (request) => {
            try {
                const { id } = request.params
                const result = await this.db.delete(id)

                if (result.n !== 1) return { statusCode: result.statusCode, message: 'Hero could not deleted!' };
                return { statusCode: result.statusCode, message: 'Hero was deleted!' }

            } catch (error) {
                console.error('Error', error)
                return 'Internal server error!'
            }
        }
    };
};
```

### Refatorando a manipulação de erros:
```bash
$ npm install @hapi/boom
```

```js
if (result.n !== 1) return Boom.preconditionFailed('Hero not found!')
```

#

## Documentação de Serviços com Swagger - Módulo 10

### Instalando Vision, Inert e Hapi-Swagger:
```bash
$ npm install @hapi/vision @hapi/inert hapi-swagger
```

### Adicionando Swagger ao nosso Serviço:
```js
// src/api/index.js

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
...
async function main() {
    ...
    const swaggerOptions = {
        info: {
            title: 'API Heroes - #CursoNodeBR',
            version: 'v1.0'
        }
    };

    await app.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    ...
};
```

```js
// src/routes/heroesRoutes.js

const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

const BaseRoute = require('./base/baseRoute');

const failAction = (request, headers, error) => {
    throw error;
};

class HeroesRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    };

    list() {
        return {
            path: '/heroes',
            method: 'GET',
            config: {
                tags: ['api'],
                description: 'Should list Heroes',
                notes: 'Can page results and filter by name',
                validate: {
                    ...
                }
            },
            handler: (request, headers) => {
                ...
            }
        };
    };

    create() {
        return {
            path: '/heroes',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'Should create Hero',
                notes: 'Should create a Hero with name and skill',
                validate: {
                    ...
                }
            },
            handler: async (request) => {
                ...
            }
        };
    };

    update() {
        return {
            path: '/heroes/{id}',
            method: 'PATCH',
            config: {
                tags: ['api'],
                description: 'Should update a Hero by id',
                notes: 'Can update any field',
                validate: {
                    ...
                }
            },
            handler: async (request) => {
                ...
            }
        }
    };

    delete() {
        return {
            path: '/heroes/{id}',
            method: 'DELETE',
            config: {
                tags: ['api'],
                description: 'Should delete a Hero by id',
                notes: 'The id should be valid',
                validate: {
                    ...
                }
            },
            handler: async (request) => {
                ...
            }
        };
    };
};

```

#

## Autenticação com JSON Web Token - Módulo 11

### O padrão JSON Web Token (JWT):
- API envia um token para acesso aos serviços
- Cliente envia este token via Headers
- A cada request este token é validado
- Refresh token

### Instalando o JWT:
```bash
$ npm install jsonwebtoken hapi-auth-jwt2
```

### Criando a rota de autenticação:
```js
const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Jwt = require('jsonwebtoken');

const BaseRoute = require('./base/baseRoute');

const failAction = (request, headers, error) => {
    throw error;
};

const USER = {
    username: 'admin',
    password: 'admin123'
}

class AuthRoutes extends BaseRoute {
    constructor(secret, db) {
        super()
        this.db = db
        this.secret = secret
    };

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Get token',
                notes: 'Does login with user and password',
                validate: {
                    failAction,
                    payload: Joi.object({
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    })
                }
            },
            handler: async (request) => {
                const { username, password } = request.payload

                const [user] = await this.db.read({ username: username.toLowerCase() })
                if (!user) return Boom.unauthorized('User not exist!')

                const match = await PasswordHelper.comparePassword(password, user.password)
                if (!match) return Boom.unauthorized('Invalid user or password!')

                const token = Jwt.sign({
                    username,
                    id: user.id
                }, this.secret);

                return { 
                    token
                };
            }
        };
    };
};

module.exports = AuthRoutes;
```

### Configurando o JWT:
```js
// src/api/index.js

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision');
const HapiJwt = require('hapi-auth-jwt2');
const HapiSwagger = require('hapi-swagger');
...
const AuthRoutes = require('../routes/authRoutes');
...
const JWT_SECRET = 'SECRET_KEY'
...
async function main() {
    ...
    await app.register([
        HapiJwt,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        validate: (data, request) => {
            return {
                isValid: true
            };
        }
    });

    app.auth.default('jwt')

    app.route([
        ...mapRoutes(new AuthRoutes(JWT_SECRET), AuthRoutes.methods()),
        ...mapRoutes(new HeroesRoutes(context), HeroesRoutes.methods())
    ]);
    ...
};

module.exports = main();
```

### Criando o módulo de autenticação de usuários e hash de senha com bcrypt:
```bash
$ npm install bcrypt
```

```js
// src/helpers/passwordHelper.js

const Bcrypt = require('bcrypt');
const { promisify } = require('util');

const hashAsync = promisify(Bcrypt.hash)
const compareAsync = promisify(Bcrypt.compare)

const SALT = 3

class PasswordHelper {
    static hashPassword (pass) {
        return hashAsync(pass, SALT)
    };

    static comparePassword (pass, hash) {
        return compareAsync(pass, hash)
    };
};

module.exports = PasswordHelper;
```

### Usando o Postgres para login:
```js
// src/db/strategies/postgres/schemas/userSchema.js

const Sequelize = require('sequelize');

const UserSchema = {
    name: 'users',
    schema: {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            required: true
        },
        password: {
            type: Sequelize.STRING,
            required: true
        }
    },
    options: {
        tableName: 'TB_USERS',
        freezeTableName: false,
        timestamps: false
    }
};

module.exports = UserSchema;
```

### Adicionando o Postgres na API:
```js
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision');
const HapiJwt = require('hapi-auth-jwt2');
const HapiSwagger = require('hapi-swagger');

const Context = require('../db/strategies/base/contextStrategy');
const MongoDB = require('../db/strategies/mongodb');
const Postgres = require('../db/strategies/postgres');

const UserSchema = require('../db/strategies/postgres/schemas/userSchema');
const HeroesSchema = require('../db/strategies/mongodb/schemas/heroesSchema');

const AuthRoutes = require('../routes/authRoutes');
const HeroesRoutes = require('../routes/heroesRoutes');

const JWT_SECRET = 'SECRET_KEY'

const app = new Hapi.Server({
    port: 3333
});

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]());
};

async function main() {
    const connectionPostgres = await Postgres.connect()
    const userSchema = await Postgres.defineModel(connectionPostgres, UserSchema)
    const contextPostgres = new Context(new Postgres(connectionPostgres, userSchema))
    
    const connection = MongoDB.connect()
    const contextMongoDB = new Context(new MongoDB(connection, HeroesSchema))

    const swaggerOptions = {
        info: {
            title: 'API Heroes - #CursoNodeBR',
            version: 'v1.0'
        }
    };

    await app.register([
        HapiJwt,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        validate: async (data, request) => {
            const result = await contextPostgres.read({ id: data.id, username: data.username })
            if (!result) return {
                isValid: false
            };
        
            return {
                isValid: true
            };
        }
    });

    app.auth.default('jwt')

    app.route([
        ...mapRoutes(new AuthRoutes(JWT_SECRET, contextPostgres), AuthRoutes.methods()),
        ...mapRoutes(new HeroesRoutes(contextMongoDB), HeroesRoutes.methods())
    ]);

    await app.start()
    console.log('Listening on port', app.info.port)

    return app;
};

module.exports = main();
```

#

## Publicação de serviços na Web - Módulo 12

### Trabalhando com multi-environments (development, production):
```bash
$ npm install dotenv
```

### Configurando o Dotenv para dev ou prod:
```js
const { config } = require('dotenv');
const { join } = require('path');
const { ok } = require('assert');

const env = process.env.NODE_ENV || 'dev';
ok(env === 'prod' || env === 'dev', 'Invalid env, should be dev or prod');

const configPath = join(__dirname, '../../config', `.env.${env}`);
config({
    path: configPath
});
```

### Rodando testes com variáveis do ambiente de produção com cross-env:
```bash
$ sudo npm install -g cross-env
$ npm install cross-env
$ cross-env NODE_ENV=prod npm t
```

### Publicação de nossos serviços e bancos de dados gratuitos com Heroku:
```bash
$ sudo npm install -g heroku
```

### Executando os comandos para subir o ambiente de produção:
```bash
--- In module-12/
$ heroku login
$ heroku apps:list
$ heroku apps:create cursonodebr-study
$ heroku git:remote --app cursonodebr-study
$ git push heroku master
```

### Trabalhando com PM2 para gerenciamento de apps:
Problemas comuns de aplicação node.js em produção:
- Comando node arquivo.js se algo inesperado ocorrer, tudo para!
- É necessário reiniciar tudo de novo manualmente
- Impossível de escalar
- Necessário uma ferramenta de gestão de aplicação

### Instalando PM2 Key Metrics:
```bash
$ sudo npm install -g pm2
$ npm install pm2
```

### Configurando o package.json pra rodar a aplicação com pm2:
```json
  "scripts": {
    ...
    "prod": "cross-env NODE_ENV=prod node src/api"
  }
```

### Fazendo o link entre PM2 e Heroku:
```bash
$ heroku config:set PM2_PUBLIC_KEY=yourkey PM2_SECRET_KEY=yourkey
```

### Expondo cobertura de código com istanbul:
```bash
$ npm install -D nyc
```

```json
// package.json

  "scripts": {
    "test": "nyc --reporter=html mocha --timeout 10000 --exit src/tests/*.test.js",
    ...
  },
```

```js
const BaseRoute = require('./base/baseRoute');
const { join } = require('path');

class UtilRoutes extends BaseRoute {
    coverage() {
        return {
            path: '/coverage/{param*}',
            method: 'GET',
            config: {
                auth: false,
            },
            handler: {
                directory: {
                    path: join(__dirname, '../../coverage'),
                    redirectToSlash: true,
                    index: true
                }
            }
        };
    };
};

module.exports = UtilRoutes;
```

#

## Faça também o [Curso NodeBR](https://treinamento.nodebr.org/), ministrado por [@ErickWendel](https://github.com/ErickWendel).


<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/lucasfrancaid
