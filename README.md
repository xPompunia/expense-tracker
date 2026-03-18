# Expense Tracker

## Start (Docker)

1. Open terminal in project root.
2. Start Docker daemon (macOS + Colima):

```bash
colima start
```

3. Start app:

```bash
docker compose up --build
```

## URLs

- Frontend: http://localhost:4200
- Backend API: http://localhost:8080/api/expenses
- PostgreSQL: localhost:5432

## Stop

```bash
docker compose down
```

## Remove DB data

```bash
docker compose down -v
```

## Optional: run without Docker

### Backend

```bash
cd backend
mvn spring-boot:run
```

### Frontend

```bash
npm start
```
