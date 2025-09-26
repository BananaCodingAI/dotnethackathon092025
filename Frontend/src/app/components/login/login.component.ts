import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Login to Shopping Portal</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form (ngSubmit)="onLogin()" #loginForm="ngForm">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput 
                     type="email" 
                     [(ngModel)]="loginData.email" 
                     name="email" 
                     required>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput 
                     type="password" 
                     [(ngModel)]="loginData.password" 
                     name="password" 
                     required>
            </mat-form-field>
            
            <button mat-raised-button 
                    color="primary" 
                    type="submit"
                    class="full-width"
                    [disabled]="!loginForm.valid || isLoading">
              {{ isLoading ? 'Logging in...' : 'Login' }}
            </button>
            
            <div class="demo-credentials">
              <p><strong>Demo Credentials:</strong></p>
              <p>Email: admin@company.com</p>
              <p>Password: password</p>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
      padding: 20px;
    }
    
    .login-card {
      width: 100%;
      max-width: 400px;
    }
    
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    
    .demo-credentials {
      margin-top: 20px;
      padding: 16px;
      background-color: #f5f5f5;
      border-radius: 4px;
      font-size: 0.9em;
    }
    
    .demo-credentials p {
      margin: 4px 0;
    }
  `]
})
export class LoginComponent {
  loginData: LoginRequest = {
    email: '',
    password: ''
  };
  
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/shop']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login failed:', error);
      }
    });
  }
}