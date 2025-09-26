import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MerchandiseService } from '../../services/merchandise.service';
import { CartService } from '../../services/cart.service';
import { Merchandise } from '../../models/merchandise.model';
import { AddToCartRequest } from '../../models/cart.model';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule
  ],
  template: `
    <div class="shop-container">
      <h2>Shop Merchandise</h2>
      
      <div class="merchandise-grid">
        <mat-card *ngFor="let item of merchandise" class="merchandise-card">
          <img mat-card-image 
               [src]="item.imageUrl" 
               [alt]="item.name"
               (error)="onImageError($event)">
          
          <mat-card-header>
            <mat-card-title>{{ item.name }}</mat-card-title>
            <mat-card-subtitle>{{ item.category }}</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <p>{{ item.description }}</p>
            <div class="price">
              <mat-icon>paid</mat-icon>
              <span>{{ item.basePriceBBcoin }} BBcoin</span>
            </div>
            <mat-chip-set>
              <mat-chip color="accent">{{ item.vendor.name }}</mat-chip>
            </mat-chip-set>
          </mat-card-content>
          
          <mat-card-actions align="end">
            <button mat-button 
                    color="primary"
                    (click)="viewDetails(item.merchandiseId)">
              View Details
            </button>
            <button mat-raised-button 
                    color="primary"
                    (click)="quickAddToCart(item)"
                    [disabled]="item.variants.length === 0">
              Add to Cart
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .shop-container {
      padding: 20px;
    }
    
    .merchandise-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .merchandise-card {
      max-width: 400px;
    }
    
    .merchandise-card img {
      height: 200px;
      object-fit: cover;
    }
    
    .price {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: bold;
      color: #2e7d32;
      margin: 10px 0;
    }
    
    mat-chip-set {
      margin-top: 10px;
    }
  `]
})
export class ShopComponent implements OnInit {
  merchandise: Merchandise[] = [];

  constructor(
    private merchandiseService: MerchandiseService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMerchandise();
  }

  loadMerchandise(): void {
    this.merchandiseService.getAllMerchandise().subscribe({
      next: (data) => {
        this.merchandise = data;
      },
      error: (error) => {
        console.error('Failed to load merchandise:', error);
      }
    });
  }

  viewDetails(merchandiseId: string): void {
    this.router.navigate(['/shop', merchandiseId]);
  }

  quickAddToCart(item: Merchandise): void {
    if (item.variants.length > 0) {
      const addToCartRequest: AddToCartRequest = {
        variantId: item.variants[0].variantId,
        quantity: 1,
        notes: ''
      };

      this.cartService.addToCart(addToCartRequest).subscribe({
        next: () => {
          console.log('Item added to cart successfully');
        },
        error: (error) => {
          console.error('Failed to add item to cart:', error);
        }
      });
    }
  }

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
  }
}