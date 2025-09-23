import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather';
import { WeatherForecast } from '../../models/weather-forecast';

@Component({
  selector: 'app-weather',
  imports: [CommonModule],
  templateUrl: './weather.html',
  styleUrl: './weather.css'
})
export class WeatherComponent implements OnInit {
  weatherData: WeatherForecast[] = [];
  loading = false;
  error = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loadWeatherData();
  }

  loadWeatherData(): void {
    this.loading = true;
    this.error = '';
    
    this.weatherService.getWeatherForecast().subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load weather data. Make sure the backend API is running.';
        this.loading = false;
        console.error('Error loading weather data:', err);
      }
    });
  }

  refreshData(): void {
    this.loadWeatherData();
  }
}
