# ExpenseTracker

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.22.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Run Full Stack In Docker

The project includes Docker setup for:

- PostgreSQL database
- Spring Boot backend
- Angular frontend

### Start all services

From the project root directory run:

```bash
docker compose up --build
```

If you are on macOS and using Colima, start Docker daemon first:

```bash
colima start
```

Services:

- Frontend: http://localhost:4200
- Backend API: http://localhost:8080/api/expenses
- PostgreSQL: localhost:5432
- H2 console is disabled in docker because backend runs with postgres profile.

### Stop services

```bash
docker compose down
```

To remove database volume as well:

```bash
docker compose down -v
```

### Logs and troubleshooting

Check all logs:

```bash
docker compose logs -f
```

Check only backend logs:

```bash
docker compose logs -f backend
```

### Notes

- Backend container uses `SPRING_PROFILES_ACTIVE=postgres`.
- Database credentials are defined in `docker-compose.yml` and can be changed there.
- Frontend in browser still calls `http://localhost:8080`, which works with this compose setup.
