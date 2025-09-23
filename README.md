# .NET Hackathon 092025

This project demonstrates a full-stack web application architecture using Angular (frontend) and ASP.NET Core Web API (backend), with RESTful API communication between the two components.

## Architecture

- **Frontend**: Angular 20.3.2 (latest stable version)
- **Backend**: ASP.NET Core 8.0 Web API
- **Communication**: RESTful API endpoints with CORS support
- **Data Format**: JSON

## Project Structure

```
dotnethackathon092025/
├── Backend/              # ASP.NET Core Web API
│   ├── Controllers/      # API Controllers
│   ├── Properties/       # Launch settings
│   ├── Program.cs        # Application entry point
│   └── Backend.csproj    # Project file
├── Frontend/             # Angular Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/      # Angular components
│   │   │   ├── services/        # API services
│   │   │   ├── models/          # TypeScript interfaces
│   │   │   └── ...
│   │   └── ...
│   ├── angular.json      # Angular configuration
│   └── package.json      # Node.js dependencies
└── README.md
```

## Prerequisites

Before running this application, ensure you have the following installed:

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) (8.0.119 or later)
- [Node.js](https://nodejs.org/) (20.19.5 or later)
- [npm](https://www.npmjs.com/) (10.8.2 or later)
- [Angular CLI](https://angular.dev/tools/cli) (20.3.2 or later)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dotnethackathon092025
```

### 2. Backend Setup

Navigate to the Backend directory and restore dependencies:

```bash
cd Backend
dotnet restore
```

Build the backend project:

```bash
dotnet build
```

### 3. Frontend Setup

Navigate to the Frontend directory and install dependencies:

```bash
cd ../Frontend
npm install
```

Build the frontend project:

```bash
npm run build
```

### 4. Install Angular CLI (if not already installed)

```bash
npm install -g @angular/cli
```

## Running the Application

### Method 1: Run Both Projects Independently

**Terminal 1 - Backend:**
```bash
cd Backend
dotnet run
```
The backend API will be available at: `http://localhost:5290`
- Swagger UI: `http://localhost:5290/swagger`

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm start
# or
ng serve
```
The frontend application will be available at: `http://localhost:4200`

### Method 2: Using npm scripts

From the Frontend directory, you can use the following commands:

```bash
# Development server
npm start

# Production build
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test -- --code-coverage
```

From the Backend directory:

```bash
# Run the API
dotnet run

# Run with hot reload
dotnet watch run

# Run tests (if any)
dotnet test
```

## API Endpoints

The backend provides the following REST endpoints:

- `GET /WeatherForecast` - Returns a list of weather forecast data

Example response:
```json
[
  {
    "date": "2025-09-24",
    "temperatureC": 22,
    "temperatureF": 71,
    "summary": "Mild"
  }
]
```

## Features

### Backend Features
- ✅ ASP.NET Core 8.0 Web API
- ✅ RESTful API endpoints
- ✅ CORS configuration for Angular frontend
- ✅ Swagger/OpenAPI documentation
- ✅ JSON serialization
- ✅ Development and production environments

### Frontend Features
- ✅ Angular 20.3.2 (latest stable)
- ✅ TypeScript support
- ✅ HTTP client for API communication
- ✅ Responsive design
- ✅ Component-based architecture
- ✅ Service injection
- ✅ Error handling
- ✅ Loading states
- ✅ Unit tests

### Communication Features
- ✅ RESTful API communication
- ✅ CORS enabled for cross-origin requests
- ✅ JSON data exchange
- ✅ Error handling and user feedback
- ✅ Real-time data refresh

## Testing

### Frontend Tests
```bash
cd Frontend
npm test                    # Run tests once
npm test -- --watch        # Run tests in watch mode
npm test -- --code-coverage # Run tests with coverage
```

### Backend Tests
```bash
cd Backend
dotnet test                 # Run all tests
dotnet test --logger:trx    # Generate test results
```

## Development

### Adding New API Endpoints
1. Create a new controller in `Backend/Controllers/`
2. Add the controller class with `[ApiController]` attribute
3. Define your endpoints with appropriate HTTP verbs
4. Update CORS policy if needed

### Adding New Frontend Components
1. Generate a new component: `ng generate component components/my-component`
2. Create corresponding service: `ng generate service services/my-service`
3. Define TypeScript interfaces in `models/`
4. Add routing if needed in `app.routes.ts`

## Configuration

### Backend Configuration
- **Port**: 5290 (configured in `Properties/launchSettings.json`)
- **CORS**: Allows Angular frontend at `http://localhost:4200`
- **Environment**: Development/Production settings in `appsettings.json`

### Frontend Configuration
- **Port**: 4200 (default Angular CLI development server)
- **API URL**: `http://localhost:5290` (configured in services)
- **Build Output**: `dist/Frontend/` directory

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure the backend is running on port 5290
   - Check that CORS policy includes the correct frontend URL

2. **Port Already in Use**
   - Backend: Change port in `launchSettings.json`
   - Frontend: Use `ng serve --port 4201`

3. **API Not Found**
   - Verify backend is running: `http://localhost:5290/swagger`
   - Check API URL in frontend services

4. **Node Modules Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request

## License

This project is part of the .NET Hackathon 092025.