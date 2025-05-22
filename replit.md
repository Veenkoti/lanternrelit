# Northern Journal - Project Overview

## User Preferences
Preferred communication style: Simple, everyday language.

## Overview
Northern Journal is a mindful journaling application designed for reflection and personal growth. The application uses a full-stack architecture with:

- React/TypeScript frontend (client-side)
- Express.js backend (server-side)
- Drizzle ORM for database operations
- PostgreSQL as the underlying database (to be added)

The app allows users to create, save, and review journal entries with features like dynamic backgrounds, prompts, and a "lantern mode" for ambiance.

## System Architecture

### Frontend (Client)
- Built with React and TypeScript
- Uses modern React patterns (hooks, context)
- UI components from Radix UI with ShadCN styling
- TanStack Query for data fetching
- Tailwind CSS for styling
- Wouter for routing

### Backend (Server)
- Express.js server
- RESTful API design with routes prefixed with `/api`
- Uses memory storage currently, but prepared for PostgreSQL integration
- Server-side rendering support via Vite

### Database
- Configured to use Drizzle ORM with PostgreSQL
- Schema defined in `shared/schema.ts`
- Currently has a basic user model with username/password fields

### State Management
- Uses React Context for application state (`JournalContext`)
- Local storage for persisting journal entries
- TanStack Query for server state management

## Key Components

### Client Components
1. **Journal Area**: Main writing interface with prompts and controls
2. **History Area**: View and search past journal entries
3. **Header/Footer**: Navigation and app controls
4. **Category Dropdown**: For selecting journal prompt categories
5. **UI Components**: Comprehensive set of reusable UI components from ShadCN

### Server Components
1. **Express Server**: Handles HTTP requests
2. **Storage Interface**: Abstraction for data persistence
3. **API Routes**: RESTful endpoints for CRUD operations
4. **Vite Integration**: For development and production builds

## Data Flow

1. **Writing Flow**:
   - User selects a category or gets a random prompt
   - User writes in the journal textarea
   - Entry is saved to local storage
   - Entries can be viewed in the history area

2. **Authentication Flow** (to be implemented):
   - User registers/logs in
   - Server validates credentials against database
   - User receives authenticated session
   - Journal entries would be persisted to the database

## External Dependencies

### Frontend Dependencies
- React ecosystem (react, react-dom)
- TanStack Query for data fetching
- Radix UI components for accessible UI elements
- Tailwind CSS for styling
- Various utility libraries (clsx, date-fns)

### Backend Dependencies
- Express.js for server
- Drizzle ORM for database operations
- Neon Database for PostgreSQL (serverless)

## Deployment Strategy

The application is configured for deployment on Replit:
- Development: `npm run dev` starts both the Vite dev server and Express backend
- Production build: `npm run build` compiles both client and server
- Production start: `npm run start` runs the compiled application

The deployment settings in `.replit` ensure:
- Node.js 20 and PostgreSQL 16 are available
- The application is accessible on port 80 (mapped from local port 5000)
- Autoscaling is enabled for production deployments

## Developer Notes

### Database Setup
- The database is configured through Drizzle and expects a DATABASE_URL environment variable
- Run `npm run db:push` to apply schema changes to the database

### Code Organization
- `/client`: Frontend React application
- `/server`: Backend Express server
- `/shared`: Shared code (schemas, types) between frontend and backend
- `/client/src/components`: UI components
- `/client/src/hooks`: Custom React hooks
- `/client/src/context`: React context providers

### Current State and Next Steps
- Basic journaling functionality is implemented using client-side storage
- User authentication needs to be implemented
- Server-side persistence needs to be connected to replace the memory storage
- API routes need to be expanded to handle journal entries