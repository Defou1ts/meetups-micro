# Meetups Api

🎉 Meetups microservices

## Installation:

Clone this repository and clone microservices inside root path of this repository. Write next lines:

```
$ git clone https://github.com/Defou1ts/meetups-gateway.git && cd meetups-gateway && yarn install && cd ..
$ git clone https://github.com/Defou1ts/meetups-auth-microservice.git && cd meetups-auth-microservice && yarn install && cd ..
$ git clone https://github.com/Defou1ts/meetups-microservice.git && cd meetups-microservice && yarn install && cd ..

```

Then create .env file inside root path of this repository and configure it.
Full environment denends on these variables and all microservices will use these variables for their connections. Example with simple configuration:

```
HOST=localhost
PORT=5000

RABBIT_MQ_HOST=rabbit
RABBIT_MQ_PORT=5672
RABBITMQ_DEFAULT_USER=admin
RABBITMQ_DEFAULT_PASS=admin
RABBITMQ_SERVER_ADDITIONAL_ERL_ARGS=-rabbit log_levels [{connection,error},{default,error}] disk_free_limit 2147483648

POSTGRES_HOST=postgres
POSTGRES_USER=postgres
POSTGRES_DB=meetups
POSTGRES_PASSWORD=root
POSTGRES_PORT=5432
PG_DATA=/var/lib/postgresql/data

JWT_ACCESS_TOKEN_SECRET=access-secret
JWT_ACCESS_TOKEN_EXPIRATION_TIME=900
JWT_REFRESH_TOKEN_SECRET=refresh-secret
JWT_REFRESH_TOKEN_EXPIRATION_TIME=28800

SALT=5

ELASTIC_HOST_FIRST_NODE=es01
ELASTIC_HOST_SECOND_NODE=es02
ELASTIC_HOST_THIRD_NODE=es03

ELASTIC_USERNAME=kibana_system
ELASTIC_PASSWORD=changeme
KIBANA_PASSWORD=changeme
STACK_VERSION=8.9.2
CLUSTER_NAME=docker-cluster
LICENSE=trial
ELASTIC_PORT=9200
KIBANA_PORT=5601
MEM_LIMIT=1073741824


GOOGLE_CLIENT_ID=217845289970-mekt63184o3mdif0dc141ahcpfibbth1.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

```

Your files structure should look like:

![image](https://github.com/Defou1ts/meetups-microservices/assets/97761585/57af0e18-bb2f-43b8-ab9e-f37e5468c915)

Start production or development docker-compose file with folowwing command:

```
$ docker-compose --file docker-compose.prod.yml up --build
//or
$ docker-compose --file docker-compose.dev.yml up --build
```

Wait, first start can take few minutes.

If you used .env above:

API will be available by http://localhost:5000
KIBANA will be available by http://localhost:5601

## Basic functionality:

- One to Many relations
- Many to Many relations
- Users role guards
- Input data validation
- HTTP correct requests and responses
- JWT authorization with access token and refresh token
- OAuth google authorization
- Swagger Docmentation
- PDF Generation
- CSV Generation

## Technologies stack & project structure:

- **_NestJS_**
- **_PostgreSQL_**
- **_Sequelize_**
- **_Swagger_**
- **_Eslint_**
- **_Prettier_**
- **_PassportJS_**
- **_RabbiqMQ_**
- **_Microservices_**
- **_Elasticsearch_**
- **_Kibana_**
