# Nest Workit Backend

A Nest.js rewrite of the Workit backend, a collaborative project management system similar to Monday.com.

## Features

- **Authentication**: JWT-based authentication with signup, login, and logout functionality
- **User Management**: CRUD operations for users
- **Board Management**: CRUD operations for boards, groups, and tasks
- **Real-time Updates**: WebSocket integration for real-time collaboration
- **MongoDB Integration**: Mongoose for database operations

## Prerequisites

- Node.js (v14 or higher)
- MongoDB

## Installation

1. Clone the repository:
```bash
git clone https://github.com/DanielAvishid/nest-workit-backend.git
cd nest-workit-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
PORT=3030
```

## Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login with username and password
- `POST /api/auth/logout` - Logout and clear authentication cookie

### Users
- `GET /api/user` - Get all users
- `GET /api/user/:id` - Get a specific user
- `PUT /api/user/:id` - Update a user
- `DELETE /api/user/:id` - Delete a user

### Boards
- `GET /api/board` - Get all boards
- `GET /api/board/:id` - Get a specific board
- `POST /api/board` - Create a new board
- `PUT /api/board/:id` - Update a board
- `DELETE /api/board/:id` - Delete a board

## WebSocket Events

- `set-board` - Join a board room for real-time updates
- `change-board` - Broadcast board changes to all connected clients

## Testing

Run the included test script to verify API functionality:
```bash
chmod +x test-api.sh
./test-api.sh
```

## Live Demo

The application is currently running at:
https://user:cb2c659c3fd6e19ba7ceb00b2523aef6@workit-backend-app-tunnel-t177r6qd.devinapps.com

## License

MIT
