# Simple Node.js App with Docker

A simple Node.js Express application with Docker support.

## Features

- Express.js server
- REST API endpoints
- Static file serving
- Health check endpoint
- Docker containerization
- Production-ready configuration

## Quick Start

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Visit http://localhost:3000

### Docker Usage

1. Build the Docker image:
```bash
docker build -t simple-node-app .
```

2. Run the container:
```bash
docker run -d -p 3001:3000 --name simple-node-container simple-node-app
```

3. Visit http://localhost:3001

## API Endpoints

- `GET /` - Returns welcome message and basic info
- `GET /health` - Health check endpoint
- `GET /api/info` - Application information

## Docker Features

- Multi-stage build optimization
- Non-root user for security
- Health check integration
- Alpine Linux base image for minimal size
- Production-ready configuration

## Project Structure

```
├── app.js              # Main application file
├── package.json        # Dependencies and scripts
├── Dockerfile         # Docker configuration
├── .dockerignore      # Docker ignore file
└── public/            # Static files
    └── index.html     # Welcome page
```