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