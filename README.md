# Expense Tracker

Expense tracking app with category filters and summaries — Angular frontend,
Spring Boot (Java) backend, PostgreSQL. The whole stack runs with one Docker
Compose command.

## Start (Docker)

```bash
docker compose up --build
```

URLs:

- Frontend: http://localhost:4200
- Backend API: http://localhost:8080/api/expenses
- PostgreSQL: localhost:5432

Stop with `docker compose down` (add `-v` to also remove database data).

## Run without Docker

Backend (defaults to the `dev` profile with a local H2 database, no setup needed):

```bash
cd backend
mvn spring-boot:run
```

Frontend:

```bash
npm install
npm start
```

## Tests

```bash
cd backend && mvn test   # backend (Spring Boot)
npm test                 # frontend (Karma/Jasmine)
```
