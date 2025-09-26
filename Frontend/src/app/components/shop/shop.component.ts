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
        // Fallback to mock data for demo purposes when API is unavailable
        console.warn('Using mock data due to API error');
        this.loadMockData();
      }
    });
  }

  loadMockData(): void {
    // Mock data for demonstration
    this.merchandise = [
      {
        merchandiseId: 'fb743680-8f68-40e0-80a6-288957b2d2f8',
        name: 'Corporate Hoodie',
        description: 'Comfortable and stylish hoodie with premium company logo',
        category: 'Apparel',
        basePriceBBcoin: 150,
        imageUrl: 'https://via.placeholder.com/300x200/2C3E50/FFFFFF?text=Corporate+Hoodie',
        vendor: {
          vendorId: 'eacde810-152e-4ee9-994f-6034fdcc0631',
          name: 'Apparel Co',
          contactEmail: 'orders@apparelco.com'
        },
        variants: [
          {
            variantId: '86d52ac6-8111-482f-b973-f9586ecd519d',
            variantLabel: 'Navy - Medium',
            vendorSku: 'HOODIE-NAVY-M',
            priceBBcoin: 150
          },
          {
            variantId: '5b8db55e-cb25-45b3-86b9-6031d02a0a7d',
            variantLabel: 'Navy - Large',
            vendorSku: 'HOODIE-NAVY-L',
            priceBBcoin: 160
          }
        ]
      },
      {
        merchandiseId: '4f0c554e-c2e8-4255-87b7-1d9308276798',
        name: 'Company Mug',
        description: 'Premium ceramic mug featuring the company logo and branding',
        category: 'Office Supplies',
        basePriceBBcoin: 25,
        imageUrl: 'https://via.placeholder.com/300x200/34495E/FFFFFF?text=Company+Mug',
        vendor: {
          vendorId: '4f71c99f-07cc-4f74-80a4-1c087fa7b1c2',
          name: 'Office Supplies Ltd',
          contactEmail: 'orders@officesupplies.com'
        },
        variants: [
          {
            variantId: '2531c17c-ec50-4f69-826a-7d00383d82d1',
            variantLabel: 'White - Standard',
            vendorSku: 'MUG-WHITE-STD',
            priceBBcoin: 25
          }
        ]
      },
      {
        merchandiseId: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Corporate T-Shirt',
        description: 'High-quality cotton t-shirt with company logo',
        category: 'Apparel',
        basePriceBBcoin: 75,
        imageUrl: 'https://via.placeholder.com/300x200/ffd600/333333?text=Corporate+T-Shirt',
        vendor: {
          vendorId: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Premium Apparel Co.',
          contactEmail: 'contact@premiumapparel.com'
        },
        variants: [
          {
            variantId: '123e4567-e89b-12d3-a456-426614174001',
            variantLabel: 'Small - White',
            vendorSku: 'CORP-TSHIRT-S-WHT',
            priceBBcoin: 75
          },
          {
            variantId: '123e4567-e89b-12d3-a456-426614174002',
            variantLabel: 'Medium - White',
            vendorSku: 'CORP-TSHIRT-M-WHT',
            priceBBcoin: 75
          },
          {
            variantId: '123e4567-e89b-12d3-a456-426614174003',
            variantLabel: 'Large - Navy Blue',
            vendorSku: 'CORP-TSHIRT-L-NAVY',
            priceBBcoin: 85
          }
        ]
      }
    ];
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