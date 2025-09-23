#!/bin/bash

echo "🚀 Testing .NET Hackathon 092025 Application Stack"
echo "=================================================="

# Test Backend
echo ""
echo "📡 Testing Backend API (ASP.NET Core)..."
if curl -s http://localhost:5290/WeatherForecast > /dev/null 2>&1; then
    echo "✅ Backend API is running on http://localhost:5290"
    echo "📊 Sample API Response:"
    curl -s http://localhost:5290/WeatherForecast | head -c 200
    echo "..."
    echo ""
    echo "📚 Swagger Documentation available at: http://localhost:5290/swagger"
else
    echo "❌ Backend API is not running. Start with: cd Backend && dotnet run"
fi

# Test Frontend
echo ""
echo "🎨 Testing Frontend (Angular)..."
if curl -s http://localhost:4200 > /dev/null 2>&1; then
    echo "✅ Frontend is running on http://localhost:4200"
    echo "🌐 Angular Application is accessible"
else
    echo "❌ Frontend is not running. Start with: cd Frontend && npm start"
fi

echo ""
echo "🎯 Test Summary:"
echo "=================="
echo "Both applications should be running independently:"
echo "• Backend: http://localhost:5290"
echo "• Frontend: http://localhost:4200"
echo "• Full-stack communication: Frontend → Backend via RESTful API"