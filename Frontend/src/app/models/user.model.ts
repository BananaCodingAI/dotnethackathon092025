export interface User {
  userId: string;
  email: string;
  displayName: string;
  role: 'Shopper' | 'Admin' | 'Procurement';
  bbcoinBalance: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}