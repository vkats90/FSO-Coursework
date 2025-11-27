# Blogs List SQL - Node.js + Express + PostgreSQL + Sequelize

Back end of blog application with a Node.js/Express backend, PostgreSQL database, and Sequelize ORM. Includes migrations, authentication, and comprehensive REST API endpoints.

## Prerequisites

- **Node.js** (v16+) and npm
- **Docker** and Docker Compose (for PostgreSQL)
- Or a running **PostgreSQL** instance (v12+)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database with Docker

Start PostgreSQL and Adminer (web UI) using Docker Compose:

```bash
docker compose up -d
```

This will:
- Start a PostgreSQL container (`db`) on `localhost:5432`
- Create database `bloglist_db` with user `root` / password `example`
- Start Adminer (database UI) on `http://localhost:8080`

**Verify the connection:**
```bash
nc -vz localhost 5432
# Expected: Connection succeeded
```

### 3. Configure Environment Variables

The `.env` file is already set up for local development:

```properties
POSTGRES_URL=postgres://root:example@localhost:5432/bloglist_db
PORT=3001
SECRET=secret
```

**For production**, update:
- `POSTGRES_URL` to your managed database connection string
- `SECRET` to a strong secret key for JWT tokens
- `PORT` to your desired port

### 4. Run Migrations

Initialize the database schema:

```bash
npm run migration:up
```

This will:
- Create `users`, `blogs`, and `reading_lists` tables
- Set up relationships and constraints

**To rollback migrations** (if needed):
```bash
npm run migration:down
```

### 5. Start the Application

**Development mode** (with hot-reload via nodemon):
```bash
npm run dev
```

**Test mode:**
```bash
npm run start:test
```

**Production build:**
```bash
npm run build
```

Expected output on successful startup:
```
Connected to Postgres
Server running on port 3001
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with auto-reload |
| `npm run start:test` | Run in test mode with nodemon |
| `npm run build` | Build TypeScript for production |
| `npm run test` | Run test suite (Jest) |
| `npm run lint` | Run ESLint code quality checks |
| `npm run migration:up` | Apply database migrations |
| `npm run migration:down` | Rollback database migrations |

## Project Structure

```
.
├── controllers/          # Route handlers
├── models/              # Sequelize model definitions
├── migrations/          # Database schema migrations
├── tests/               # Jest test files
├── utils/               # Helpers (logger, migration runner, etc.)
├── app.ts               # Express app setup
├── index.ts             # Server entry point
├── dbConnection.ts      # Sequelize configuration
├── initDB.ts            # Database initialization
├── docker-compose.yml   # Docker services definition
└── package.json         # Dependencies and scripts
```

## API Endpoints

The app exposes REST endpoints for:
- **Users** - registration, login, profile
- **Blogs** - CRUD operations, filtering, search
- **Authors** - blog statistics per author
- **Reading Lists** - user reading lists management

See `controllers/` directory for detailed endpoint implementations.

## Database

### Tables
- **users** - user accounts with JWT tokens
- **blogs** - blog articles with metadata
- **authors** - blog author statistics (denormalized view)
- **reading_lists** - user reading lists for bookmarking blogs

### SSL/TLS

- **Development & Test**: SSL disabled (local Postgres doesn't support SSL)
- **Production**: SSL enabled by default with certificate validation

SSL is configured in `dbConnection.ts` and automatically enabled only when `NODE_ENV=production`.

## Troubleshooting

### "Connection refused" on localhost:5432

Ensure Docker Compose is running:
```bash
docker compose ps
# Should show 'db' and 'adminer' containers as 'Up'
```

If containers aren't running:
```bash
docker compose down
docker compose up -d
```

### "The server does not support SSL connections"

This error occurs if trying to use SSL with a local Postgres (which doesn't support it). The app should handle this automatically based on `NODE_ENV`. Verify `.env` has correct `POSTGRES_URL` and `NODE_ENV=development` when running locally.

### Database already exists

If you get a "database already exists" error during setup, you can:
1. Use Adminer at `http://localhost:8080` to drop the database
2. Or reset Docker volumes:
   ```bash
   docker compose down -v
   docker compose up -d
   ```

### Migrations not running

Ensure PostgreSQL is running and accessible, then:
```bash
npm run migration:up
```

Check logs for specific errors. If migrations fail, verify the database connection in `.env`.

## Testing

Run the full test suite:

```bash
npm test
```

Tests run with `NODE_ENV=test` and use a separate test database (configure `TEST_POSTGRES_URL` in `.env` if needed).

## Environment Variables Reference

| Variable | Default | Description |
|----------|---------|-------------|
| `POSTGRES_URL` | `postgres://root:example@localhost:5432/bloglist_db` | PostgreSQL connection string |
| `TEST_POSTGRES_URL` | Optional | Separate DB for tests (falls back to `POSTGRES_URL`) |
| `PORT` | `3001` | Server listening port |
| `SECRET` | `secret` | JWT signing secret (change for production!) |
| `NODE_ENV` | `development` | Environment: `development`, `test`, or `production` |

## Development Tips

- **Hot reload**: Changes to `.ts` files trigger automatic restart via `nodemon`
- **Database UI**: Visit `http://localhost:8080` (Adminer) to inspect/edit database directly
- **Logs**: Check console output for Sequelize query logs (disabled in test mode)
- **Linting**: Run `npm run lint` before committing

## License

ISC
