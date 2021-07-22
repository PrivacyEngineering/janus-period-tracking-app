# period-tracking-app

## Run
1. Make sure that NodeJS is installed on your local machine. 
2. Run `npm install` to install all dependencies.
3. Run `npm start` to start the GraphQL-Server. The GraphQL-Playground is available under https://localhost:4000 

## DB conncetion
Start DB: 
``` docker run --name period-tracking-db -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_USER=user -e POSTGRES_DB=period-tracking -d postgres```

Debug into DB: 
```docker exec -it period-tracking-db psql -d period-tracking -U user```

Remove DB:
``` docker rm -f period-tracking-db```

## Install other local packages
Run ```npm link``` in the folder that contains the ```anonymizer``` project. 

Run ```npm link``` in the folder that contains the ```gragphql-access-control``` project.

Run ```npm link anonymizer``` contains the ```gragphql-access-control``` project

Run ```npm link graphql-access-control``` where you want to link this package.

## Tokens
Researcher: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoiUmVzZWFyY2hlciJ9.8sHsYNN3jhMF_ZHiYmsV4HXg0U9RdA58SatsQFRNDxo

Advertiser: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoiQWR2ZXJ0aXNlciJ9.Ey1wKGi0d9j_5xK8KLmV46RVxhZen2Li6HVbNPqlN1c

User: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoiVXNlciJ9.zwmogyzSgQkpVYpR90g84yv6mgJrpgkKpJtftDSBYC4

# Azure

## Deploy Database
Login: ```az login```

Create: ```az postgres server create --resource-group PEng --name dbpeng2  --location westeurope --admin-user myadmin --admin-password VjYK5YcGMswGU7FFd9hfy6kpYm8267XquSMSusaV --sku-name GP_Gen5_2``` 

Firewall: ``` az postgres server firewall-rule create --resource-group PEng --server dbpeng2 --name AllowIP --start-ip-address 0.0.0.0 --end-ip-address 255.255.255.255 ```

```az postgres server update --resource-group PEng --name dbpeng2 --ssl-enforcement Disabled```

Connection-String: postgres://myadmin@dbpeng2:VjYK5YcGMswGU7FFd9hfy6kpYm8267XquSMSusaV@dbpeng2.postgres.database.azure.com:5432/postgres
```psql --host=dbpeng2.postgres.database.azure.com --port=5432 --username=myadmin@dbpeng2 --dbname=postgres```

Delete: ``` az postgres server delete --resource-group PEng --name dbpeng2 ```

