import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cart, CartItem, AddToCartRequest } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5290/api/cart';
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl)
      .pipe(
        tap(cart => this.cartSubject.next(cart))
      );
  }

  addToCart(item: AddToCartRequest): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/items`, item)
      .pipe(
        tap(() => this.refreshCart())
      );
  }

  updateCartItem(itemId: string, quantity: number, notes?: string): Observable<CartItem> {
    return this.http.patch<CartItem>(`${this.apiUrl}/items/${itemId}`, { quantity, notes })
      .pipe(
        tap(() => this.refreshCart())
      );
  }

  removeFromCart(itemId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/items/${itemId}`)
      .pipe(
        tap(() => this.refreshCart())
      );
  }

  private refreshCart(): void {
    this.getCart().subscribe();
  }
}