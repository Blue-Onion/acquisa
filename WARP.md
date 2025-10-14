# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Acquisa is an Express.js backend API using modern ES modules, PostgreSQL with Drizzle ORM, and JWT authentication. The project follows a layered architecture with clear separation between routes, controllers, services, and models.

## Development Commands

### Core Development
- `npm run dev` - Start development server with hot reload using Node.js --watch
- `npm run lint` - Run ESLint to check for code issues  
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run formatcheck` - Check if code follows Prettier formatting

### Database Operations
- `npm run db:generate` - Generate Drizzle migration files from schema changes
- `npm run db:migrate` - Apply pending migrations to database
- `npm run db:studio` - Open Drizzle Studio for database inspection

### Environment Setup
- Copy `.env.example` to `.env` and configure:
  - `DATABASE_URL` - PostgreSQL connection string (required for Neon database)
  - `PORT` - Server port (default: 3000)
  - `NODE_ENV` - Environment (development/production)
  - `LOG_LEVEL` - Winston logging level
  - `JWT_SECRET` - JWT signing secret

## Architecture

### Import Aliases
The project uses Node.js subpath imports for clean module resolution:
- `#config/*` → `./src/config/*`
- `#models/*` → `./src/models/*`
- `#controllers/*` → `./src/controllers/*`
- `#routes/*` → `./src/routes/*`
- `#services/*` → `./src/services/*`
- `#utils/*` → `./src/utils/*`

### Database Layer
- **ORM**: Drizzle ORM with Neon serverless PostgreSQL
- **Models**: Defined in `src/models/` using Drizzle schema
- **Configuration**: Database connection in `src/config/database.js`
- **Migrations**: Generated in `.drizzle/` directory

### Request Flow
1. **Routes** (`src/routes/`) - Express router definitions
2. **Controllers** (`src/controllers/`) - Request handling and response formatting  
3. **Services** (`src/services/`) - Business logic and database operations
4. **Models** (`src/models/`) - Drizzle schema definitions

### Authentication System
- JWT-based authentication with HTTP-only cookies
- Password hashing using bcrypt (salt rounds: 10)
- Role-based access control (user/admin roles)
- Input validation using Zod schemas

### Logging
- Winston logger with JSON formatting
- File logging: `logs/errors.log` and `logs/combined.log`
- Console logging in development with colorized output
- Request logging via Morgan middleware

## Key Technical Details

### Database Schema
User model includes: id, name, email, password (hashed), role, created_at, updated_at

### Security Features
- Helmet for security headers
- CORS enabled
- Cookie security settings (httpOnly, secure in production, sameSite: strict)
- Request validation with Zod

### Error Handling
- Centralized error logging
- Validation error formatting utility
- Consistent API error responses

## Development Notes

### Known Issues
- JWT utility (`src/utils/jwt.js`) has syntax errors - missing `return` statement and object structure
- Format utility (`src/utils/format.js`) has incomplete array handling logic
- Auth controller has inconsistent error checking logic

### Testing
Currently no test framework is configured (package.json test script returns error)

### Code Style
- ES modules throughout
- Prettier + ESLint configuration
- Import aliases for clean module references