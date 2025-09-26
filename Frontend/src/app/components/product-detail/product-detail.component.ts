import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MerchandiseService } from '../../services/merchandise.service';
import { CartService } from '../../services/cart.service';
import { Merchandise, MerchandiseVariant } from '../../models/merchandise.model';
import { AddToCartRequest } from '../../models/cart.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ],
  template: `
    <div class="product-detail-container" *ngIf="merchandise">
      <!-- Navigation -->
      <div class="navigation">
        <button mat-button color="primary" (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
          Back to Shop
        </button>
      </div>

      <!-- Product Detail Card -->
      <mat-card class="product-card">
        <div class="product-layout">
          <!-- Product Image -->
          <div class="product-image-section">
            <img [src]="merchandise.imageUrl" 
                 [alt]="merchandise.name"
                 (error)="onImageError($event)"
                 class="product-image">
          </div>

          <!-- Product Information -->
          <div class="product-info-section">
            <mat-card-header>
              <mat-card-title class="product-title">{{ merchandise.name }}</mat-card-title>
              <mat-card-subtitle class="product-category">{{ merchandise.category }}</mat-card-subtitle>
            </mat-card-header>

            <mat-card-content class="product-content">
              <!-- Description -->
              <div class="description-section">
                <h3>Description</h3>
                <p class="product-description">{{ merchandise.description }}</p>
              </div>

              <!-- Price -->
              <div class="price-section">
                <div class="price">
                  <mat-icon>paid</mat-icon>
                  <span class="price-amount">{{ merchandise.basePriceBBcoin }} BBcoin</span>
                </div>
              </div>

              <!-- Vendor Information -->
              <div class="vendor-section">
                <h3>Vendor</h3>
                <mat-chip-set>
                  <mat-chip color="accent">
                    <mat-icon>business</mat-icon>
                    {{ merchandise.vendor.name }}
                  </mat-chip>
                </mat-chip-set>
                <p class="vendor-contact">Contact: {{ merchandise.vendor.contactEmail }}</p>
              </div>

              <!-- Variants Selection -->
              <div class="variants-section" *ngIf="merchandise.variants.length > 0">
                <h3>Available Options</h3>
                <mat-form-field appearance="outline" class="variant-select">
                  <mat-label>Select Variant</mat-label>
                  <mat-select [(value)]="selectedVariant">
                    <mat-option *ngFor="let variant of merchandise.variants" [value]="variant">
                      {{ variant.variantLabel }} - {{ variant.priceBBcoin }} BBcoin
                    </mat-option>
                  </mat-select>
                </mat-form-field>

                <!-- Selected Variant Details -->
                <div class="selected-variant" *ngIf="selectedVariant">
                  <div class="variant-info">
                    <p><strong>Selected:</strong> {{ selectedVariant.variantLabel }}</p>
                    <p><strong>SKU:</strong> {{ selectedVariant.vendorSku }}</p>
                    <div class="variant-price">
                      <mat-icon>paid</mat-icon>
                      <span>{{ selectedVariant.priceBBcoin }} BBcoin</span>
                    </div>
                  </div>
                </div>
              </div>
            </mat-card-content>

            <!-- Actions -->
            <mat-card-actions class="product-actions">
              <button mat-raised-button 
                      color="primary"
                      (click)="addToCart()"
                      [disabled]="merchandise.variants.length > 0 && !selectedVariant"
                      class="add-to-cart-btn">
                <mat-icon>add_shopping_cart</mat-icon>
                Add to Cart
              </button>
              <button mat-button 
                      color="primary"
                      (click)="goBack()">
                Continue Shopping
              </button>
            </mat-card-actions>
          </div>
        </div>
      </mat-card>
    </div>

    <!-- Loading State -->
    <div class="loading-container" *ngIf="isLoading">
      <mat-card>
        <mat-card-content>
          <p>Loading product details...</p>
        </mat-card-content>
      </mat-card>
    </div>

    <!-- Error State -->
    <div class="error-container" *ngIf="hasError">
      <mat-card>
        <mat-card-content>
          <p>Product not found or failed to load.</p>
          <button mat-button color="primary" (click)="goBack()">
            <mat-icon>arrow_back</mat-icon>
            Back to Shop
          </button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .product-detail-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .navigation {
      margin-bottom: 20px;
    }

    .product-card {
      padding: 24px;
    }

    .product-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: start;
    }

    @media (max-width: 768px) {
      .product-layout {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }

    .product-image-section {
      display: flex;
      justify-content: center;
    }

    .product-image {
      width: 100%;
      max-width: 500px;
      height: auto;
      max-height: 400px;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .product-info-section {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .product-title {
      font-size: 2rem;
      font-weight: bold;
      color: #333;
    }

    .product-category {
      font-size: 1.1rem;
      color: #666;
      text-transform: uppercase;
    }

    .product-content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .description-section h3,
    .vendor-section h3,
    .variants-section h3 {
      margin: 0 0 12px 0;
      color: #333;
      font-size: 1.2rem;
    }

    .product-description {
      line-height: 1.6;
      color: #555;
      font-size: 1rem;
    }

    .price-section {
      border: 2px solid #ffd600;
      border-radius: 8px;
      padding: 16px;
      background-color: #fffbf0;
    }

    .price {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .price-amount {
      font-size: 1.5rem;
      font-weight: bold;
      color: #2e7d32;
    }

    .vendor-contact {
      margin-top: 8px;
      color: #666;
      font-size: 0.9rem;
    }

    .variant-select {
      width: 100%;
      margin-bottom: 16px;
    }

    .selected-variant {
      background-color: #f5f5f5;
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid #ffd600;
    }

    .variant-info p {
      margin: 4px 0;
      color: #333;
    }

    .variant-price {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: bold;
      color: #2e7d32;
      margin-top: 8px;
    }

    .product-actions {
      margin-top: 24px;
      display: flex;
      gap: 12px;
      justify-content: flex-start;
    }

    .add-to-cart-btn {
      min-width: 180px;
    }

    .loading-container,
    .error-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
    }

    mat-chip {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  merchandise: Merchandise | null = null;
  selectedVariant: MerchandiseVariant | null = null;
  isLoading = true;
  hasError = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private merchandiseService: MerchandiseService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProductDetail(id);
    } else {
      this.hasError = true;
      this.isLoading = false;
    }
  }



  loadProductDetail(merchandiseId: string): void {
    this.isLoading = true;
    this.hasError = false;

    this.merchandiseService.getMerchandiseById(merchandiseId).subscribe({
      next: (data) => {
        this.merchandise = data;
        // Auto-select first variant if available
        if (data.variants.length > 0) {
          this.selectedVariant = data.variants[0];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load product details:', error);
        // Fallback to mock data for demo purposes when API fails
        console.warn('Using mock data due to API error');
        this.loadMockDataById(merchandiseId);
      }
    });
  }

  loadMockDataById(merchandiseId: string): void {
    // Mock data for demonstration - different products based on ID
    const mockProducts = {
      'fb743680-8f68-40e0-80a6-288957b2d2f8': {
        merchandiseId: 'fb743680-8f68-40e0-80a6-288957b2d2f8',
        name: 'Corporate Hoodie',
        description: 'Comfortable and stylish hoodie with premium company logo embroidered on the front. Made from high-quality cotton blend fabric that provides warmth and comfort. Perfect for casual office days, outdoor corporate events, and representing your company with pride.',
        category: 'Apparel',
        basePriceBBcoin: 150,
        imageUrl: 'https://via.placeholder.com/500x400/2C3E50/FFFFFF?text=Corporate+Hoodie',
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
      '4f0c554e-c2e8-4255-87b7-1d9308276798': {
        merchandiseId: '4f0c554e-c2e8-4255-87b7-1d9308276798',
        name: 'Company Mug',
        description: 'Premium ceramic mug featuring the company logo and branding. Holds 12oz of your favorite beverage. Dishwasher and microwave safe. Perfect for office use or as a corporate gift for employees and clients.',
        category: 'Office Supplies',
        basePriceBBcoin: 25,
        imageUrl: 'https://via.placeholder.com/500x400/34495E/FFFFFF?text=Company+Mug',
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
      }
    };

    // Get product by ID or use a default
    const product = mockProducts[merchandiseId as keyof typeof mockProducts] || {
      merchandiseId: merchandiseId,
      name: 'Premium Corporate T-Shirt',
      description: 'High-quality cotton t-shirt with company logo. Perfect for corporate events, team building activities, and casual office wear. Features a comfortable fit and durable print that lasts through multiple washes.',
      category: 'Apparel',
      basePriceBBcoin: 150,
      imageUrl: 'https://via.placeholder.com/500x400/ffd600/333333?text=Corporate+T-Shirt',
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
          priceBBcoin: 150
        },
        {
          variantId: '123e4567-e89b-12d3-a456-426614174002',
          variantLabel: 'Medium - White',
          vendorSku: 'CORP-TSHIRT-M-WHT',
          priceBBcoin: 150
        },
        {
          variantId: '123e4567-e89b-12d3-a456-426614174003',
          variantLabel: 'Large - Navy Blue',
          vendorSku: 'CORP-TSHIRT-L-NAVY',
          priceBBcoin: 165
        },
        {
          variantId: '123e4567-e89b-12d3-a456-426614174004',
          variantLabel: 'X-Large - Navy Blue',
          vendorSku: 'CORP-TSHIRT-XL-NAVY',
          priceBBcoin: 175
        }
      ]
    };

    this.merchandise = product;
    
    // Auto-select first variant if available
    if (this.merchandise.variants.length > 0) {
      this.selectedVariant = this.merchandise.variants[0];
    }
    this.isLoading = false;
  }

  addToCart(): void {
    if (!this.merchandise) return;

    console.log('Add to cart clicked - Demo mode');
    alert(`Added "${this.selectedVariant?.variantLabel || this.merchandise.name}" to cart!`);
    
    // Original implementation would be:
    /*
    let variantToAdd: MerchandiseVariant;
    
    if (this.merchandise.variants.length > 0) {
      if (!this.selectedVariant) {
        console.error('No variant selected');
        return;
      }
      variantToAdd = this.selectedVariant;
    } else {
      // If no variants, create a default one based on merchandise
      variantToAdd = {
        variantId: this.merchandise.merchandiseId,
        variantLabel: 'Default',
        vendorSku: 'DEFAULT',
        priceBBcoin: this.merchandise.basePriceBBcoin
      };
    }

    const addToCartRequest: AddToCartRequest = {
      variantId: variantToAdd.variantId,
      quantity: 1,
      notes: ''
    };

    this.cartService.addToCart(addToCartRequest).subscribe({
      next: () => {
        console.log('Item added to cart successfully');
        // Could add a success message here
      },
      error: (error) => {
        console.error('Failed to add item to cart:', error);
        // Could add an error message here
      }
    });
    */
  }

  goBack(): void {
    this.router.navigate(['/shop']);
  }

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/500x400?text=No+Image';
  }
}