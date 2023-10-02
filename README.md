# Meetups Api

🎉 Meetups microservices

## Installation:

### .env and .env.dev

Create .env and file inside root path of this repository and configure. These variabels will be used by docker to configure start.
Example with simple configuration .env and .env.dev:

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

```

### .env.root and .env.dev.root

Create .env.root and .env.root.dev file inside root path of this repository and configure. These variabels are common for each microservice and will be used by them.
Example with simple configuration .env.root and .env.root.dev:

```
RABBIT_MQ_HOST=rabbit
RABBIT_MQ_PORT=5672
RABBITMQ_DEFAULT_USER=admin
RABBITMQ_DEFAULT_PASS=admin
RABBITMQ_SERVER_ADDITIONAL_ERL_ARGS=-rabbit log_levels [{connection,error},{default,error}] disk_free_limit 2147483648

```

-   Configure environment for each microservice.
-   https://github.com/Defou1ts/meetups-micro/tree/main/apps/gateway/README.md
-   https://github.com/Defou1ts/meetups-micro/tree/main/apps/meetups/README.md
-   https://github.com/Defou1ts/meetups-micro/tree/main/apps/users/README.md
-   Start production or development docker-compose file with folowwing command:

```
$ yarn start:dev
//or
$ yarn start:prod
```

Wait, first start can take few minutes.

If you used environment above:

API will be available by http://localhost:5000
KIBANA will be available by http://localhost:5601

## Basic functionality:

-   One to Many relations
-   Many to Many relations
-   Users role guards
-   Input data validation
-   HTTP correct requests and responses
-   JWT authorization with access token and refresh token
-   OAuth google authorization
-   Swagger Docmentation
-   PDF Generation
-   CSV Generation

## Technologies stack & project structure:

-   **_NestJS_**
-   **_PostgreSQL_**
-   **_Sequelize_**
-   **_Swagger_**
-   **_Eslint_**
-   **_Prettier_**
-   **_PassportJS_**
-   **_RabbiqMQ_**
-   **_Microservices_**
-   **_Elasticsearch_**
-   **_Kibana_**
