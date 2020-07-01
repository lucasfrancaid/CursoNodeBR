# Imersão em desenvolvimento de APIs com Node.js, By #NodeBR!


## Sumário:

00. <a href="#introdução---módulo-00"> Introdução </a>
01. <a href="#sincronia-de-funções-javascript---módulo-01"> Sincronia de funções Javascript </a>
02. <a href="#manipulação-de-listas---módulo-02"> Manipulação de listas </a>
03. <a href="#introdução-a-desenvolvimento-de-testes-automatizados-em-javascript---módulo-03"> Introdução a desenvolvimento de testes automatizados em Javascript </a>
04. <a href="#nodejs-além-da-web---criando-ferramentas-de-linha-de-comando---módulo-04"> Node.js além da Web - Criando ferramentas de linha de comando </a>
05. <a href="#bancos-de-dados---nosso-projeto-multi-banco-de-dados---módulo-05"> Bancos de Dados - Nosso projeto Multi-banco de dados </a>
06. <a href="#introdução-ao-postgres-e-bancos-relacionais---módulo-06"> Introdução ao Postgres e Bancos Relacionais </a>

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
- Foram criados os bancos de dados utilizando docker (+infos em module-05/README.md)
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
- Estruturas Fixas
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

