# Trains application

A small example application that fetches arriving and departing trains for a selected train station. Train stations metadata is
stored to Redis cache. The application consists of a NextJs application and Redis cache.

# Running in Docker in production mode

```docker-compose up```

Navigate to http://localhost:3000 to view the application 

# Running in local development mode

Start Redis container:

```docker-compose -f docker-compose-local.yml up```

Start the application in development mode

```npm install```

```npm run dev```

Navigate to http://localhost:3000 to view the application