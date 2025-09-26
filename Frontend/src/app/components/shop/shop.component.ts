import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MerchandiseService } from '../../services/merchandise.service';
import { CartService } from '../../services/cart.service';
import { Merchandise } from '../../models/merchandise.model';
import { AddToCartRequest } from '../../models/cart.model';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatBadgeModule,
    MatDialogModule,
    MatTooltipModule
  ],
  template: `
    <div class="shop-container">
      <div class="header-section">
        <h2 class="shop-title">
          <span class="title-icon">🛒</span>
          Shop Merchandise
        </h2>
        <p class="shop-subtitle">Discover amazing products with intelligent image analysis</p>
      </div>
      
      <div class="merchandise-grid">
        <mat-card *ngFor="let item of merchandise" 
                  class="merchandise-card" 
                  matRipple
                  [matRippleColor]="'rgba(255, 214, 0, 0.1)'"
                  (mouseenter)="analyzeImage(item)"
                  [class.loading]="item.isAnalyzing">
          
          <div class="image-container">
            <img mat-card-image 
                 [src]="item.imageUrl" 
                 [alt]="item.name"
                 (error)="onImageError($event)"
                 (load)="onImageLoad($event, item)"
                 (click)="openImageModal(item)"
                 [class.loaded]="item.imageLoaded"
                 class="clickable-image">
            
            <div class="zoom-indicator" *ngIf="item.imageLoaded">
              <span class="zoom-icon">🔍</span>
            </div>
            
            <div class="image-overlay" [class.visible]="item.showOverlay">
              <div class="overlay-content">
                <span class="analytics-icon">🤖</span>
                <span>AI Analysis</span>
              </div>
            </div>
            
            <div class="loading-indicator" *ngIf="item.isAnalyzing">
              <mat-spinner diameter="30"></mat-spinner>
            </div>
            
            <div class="image-badge" *ngIf="item.analysisComplete">
              <span class="verified-icon" title="AI Verified">✓</span>
            </div>
          </div>
          
          <mat-card-header class="enhanced-header">
            <div class="title-section">
              <mat-card-title class="product-title">{{ item.name }}</mat-card-title>
              <mat-card-subtitle class="product-category">{{ item.category }}</mat-card-subtitle>
            </div>
            <div class="rating-section" *ngIf="item.aiRating">
              <div class="ai-rating">
                <span class="star-icon">⭐</span>
                <span>{{ item.aiRating }}/5</span>
              </div>
            </div>
          </mat-card-header>
          
          <mat-card-content class="enhanced-content">
            <p class="description">{{ item.description }}</p>
            
            <div class="ai-insights" *ngIf="item.aiInsights">
              <div class="insight-chip">
                <span class="psychology-icon">🧠</span>
                <span>{{ item.aiInsights }}</span>
              </div>
            </div>
            
            <div class="price-section">
              <div class="price">
                <span class="price-icon">💰</span>
                <span class="price-amount">{{ item.basePriceBBcoin }}</span>
                <span class="currency">BBcoin</span>
              </div>
              <div class="value-badge" *ngIf="item.isGoodValue">
                <mat-chip color="accent">
                  <span class="trend-icon">📈</span>
                  Great Value
                </mat-chip>
              </div>
            </div>
            
            <mat-chip-set class="vendor-chips">
              <mat-chip color="primary" class="vendor-chip">
                <span class="business-icon">🏢</span>
                {{ item.vendor.name }}
              </mat-chip>
            </mat-chip-set>
          </mat-card-content>
          
          <mat-card-actions align="end" class="enhanced-actions">
            <button mat-button 
                    color="primary"
                    class="details-btn"
                    (click)="viewDetails(item.merchandiseId)">
              <span class="visibility-icon">👁️</span>
              View Details
            </button>
            <button mat-raised-button 
                    color="primary"
                    class="cart-btn"
                    (click)="quickAddToCart(item)"
                    [disabled]="item.variants.length === 0">
              <span class="cart-icon">🛒</span>
              Add to Cart
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
      
      <div class="floating-actions">
        <button mat-fab 
                color="accent" 
                class="ai-analyze-btn"
                (click)="analyzeAllImages()"
                *ngIf="!allAnalyzed"
                matTooltip="Analyze All Images with AI">
          <span class="awesome-icon">✨</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .shop-container {
      padding: 24px;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      min-height: 100vh;
    }
    
    .header-section {
      text-align: center;
      margin-bottom: 40px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 16px;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
    
    .shop-title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin: 0 0 8px 0;
      font-size: 2.5rem;
      font-weight: 600;
      color: #ff8f00;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .title-icon {
      font-size: 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
      color: #ffd600;
      display: inline-block;
      text-align: center;
    }
    
    .shop-subtitle {
      color: #666;
      font-size: 1.1rem;
      margin: 0;
      opacity: 0.8;
    }
    
    .merchandise-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
      margin-top: 20px;
    }
    
    .merchandise-card {
      max-width: 400px;
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      position: relative;
    }
    
    .merchandise-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .merchandise-card.loading {
      pointer-events: none;
    }
    
    .image-container {
      position: relative;
      overflow: hidden;
      height: 220px;
    }
    
    .merchandise-card img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      transition: all 0.6s ease;
      opacity: 0;
    }
    
    .merchandise-card img.loaded {
      opacity: 1;
    }
    
    .clickable-image {
      cursor: pointer;
    }
    
    .zoom-indicator {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      border-radius: 50%;
      padding: 8px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .image-container:hover .zoom-indicator {
      opacity: 1;
    }
    
    .merchandise-card:hover img {
      transform: scale(1.1);
    }
    
    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(255, 214, 0, 0.9), rgba(255, 143, 0, 0.9));
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .image-overlay.visible {
      opacity: 1;
    }
    
    .overlay-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      font-weight: 600;
    }
    
    .overlay-content span.analytics-icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
      margin-bottom: 8px;
      display: block;
    }
    
    .loading-indicator {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      padding: 16px;
    }
    
    .image-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      padding: 8px;
    }
    
    .enhanced-header {
      padding: 16px 16px 8px 16px;
    }
    
    .title-section {
      flex: 1;
    }
    
    .product-title {
      font-size: 1.3rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }
    
    .product-category {
      color: #666;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .rating-section {
      display: flex;
      align-items: center;
    }
    
    .ai-rating {
      display: flex;
      align-items: center;
      gap: 4px;
      background: linear-gradient(45deg, #ffd600, #ff8f00);
      color: white;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    
    .star-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
      display: inline-block;
    }
    
    .zoom-icon,
    .verified-icon,
    .awesome-icon {
      font-size: inherit;
      display: inline-block;
    }
    
    .verified-icon {
      color: #4caf50;
      font-weight: bold;
      font-size: 1.2rem;
    }
    
    .enhanced-content {
      padding: 8px 16px 16px 16px;
      position: relative;
      z-index: 2;
      background: rgba(255, 255, 255, 0.9);
    }
    
    .description {
      color: #555;
      line-height: 1.5;
      margin-bottom: 12px;
    }
    
    .ai-insights {
      margin-bottom: 12px;
    }
    
    .insight-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: linear-gradient(45deg, #e3f2fd, #bbdefb);
      color: #1976d2;
      padding: 6px 12px;
      border-radius: 16px;
      font-size: 0.8rem;
      font-weight: 500;
    }
    
    .insight-chip span.psychology-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
      display: inline-block;
      margin-right: 6px;
    }
    
    .price-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    
    .price {
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;
      z-index: 2;
    }
    
    .price-icon,
    .trend-icon,
    .business-icon {
      color: #2e7d32;
      font-size: 1.2rem;
      width: 1.2rem;
      height: 1.2rem;
      display: inline-block;
      text-align: center;
    }
    
    .price-icon {
      color: #2e7d32;
    }
    
    .trend-icon {
      color: #00bcd4;
    }
    
    .business-icon {
      color: #333;
    }
    
    .price-amount {
      font-weight: 700;
      font-size: 1.3rem;
      color: #2e7d32;
    }
    
    .currency {
      font-weight: 600;
      color: #2e7d32;
      font-size: 0.9rem;
    }
    
    .value-badge mat-chip {
      font-size: 0.7rem;
      height: 24px;
    }
    
    .value-badge span.trend-icon {
      font-size: 0.9rem;
      width: 0.9rem;
      height: 0.9rem;
      margin-right: 4px;
      display: inline-block;
    }
    
    .vendor-chips {
      margin-top: 12px;
      position: relative;
      z-index: 2;
    }
    
    .vendor-chip {
      background: linear-gradient(45deg, #ffd600, #ff8f00);
      color: #333;
      font-weight: 600;
    }
    
    .vendor-chip span.business-icon {
      margin-right: 6px;
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
      display: inline-block;
    }
    
    .enhanced-actions {
      padding: 8px 16px 16px 16px;
      gap: 8px;
    }
    
    .details-btn {
      border-radius: 20px;
      font-weight: 600;
    }
    
    .details-btn span.visibility-icon {
      margin-right: 6px;
      font-size: 1.1rem;
      display: inline-block;
    }
    
    .cart-btn {
      border-radius: 20px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(255, 214, 0, 0.3);
      transition: all 0.3s ease;
    }
    
    .cart-btn:hover {
      box-shadow: 0 6px 20px rgba(255, 214, 0, 0.4);
      transform: translateY(-2px);
    }
    
    .cart-btn span.cart-icon {
      margin-right: 6px;
      font-size: 1.1rem;
      display: inline-block;
    }
    
    /* Animation for card loading */
    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: calc(200px + 100%) 0; }
    }
    
    .merchandise-card.loading::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      animation: shimmer 2s infinite;
      z-index: 1;
    }
    
    /* Floating Action Button */
    .floating-actions {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 1000;
    }
    
    .ai-analyze-btn {
      background: linear-gradient(45deg, #ff6b6b, #ee5a52);
      box-shadow: 0 8px 24px rgba(255, 107, 107, 0.4);
      animation: pulse 2s infinite;
    }
    
    .ai-analyze-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 12px 32px rgba(255, 107, 107, 0.6);
    }
    
    @keyframes pulse {
      0% { box-shadow: 0 8px 24px rgba(255, 107, 107, 0.4); }
      50% { box-shadow: 0 8px 24px rgba(255, 107, 107, 0.8); }
      100% { box-shadow: 0 8px 24px rgba(255, 107, 107, 0.4); }
    }
  `]
})
export class ShopComponent implements OnInit {
  merchandise: (Merchandise & {
    imageLoaded?: boolean;
    showOverlay?: boolean;
    isAnalyzing?: boolean;
    analysisComplete?: boolean;
    aiRating?: number;
    aiInsights?: string;
    isGoodValue?: boolean;
  })[] = [];

  allAnalyzed = false;

  constructor(
    private merchandiseService: MerchandiseService,
    private cartService: CartService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadMerchandise();
  }

  loadMerchandise(): void {
    this.merchandiseService.getAllMerchandise().subscribe({
      next: (data) => {
        this.merchandise = data.map(item => ({
          ...item,
          imageLoaded: false,
          showOverlay: false,
          isAnalyzing: false,
          analysisComplete: false,
          aiRating: undefined,
          aiInsights: undefined,
          isGoodValue: false
        }));
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
    event.target.src = 'https://via.placeholder.com/300x200/ffd600/333333?text=No+Image+Available';
    event.target.classList.add('loaded');
  }

  onImageLoad(event: any, item: any): void {
    item.imageLoaded = true;
    event.target.classList.add('loaded');
  }

  analyzeImage(item: any): void {
    if (item.analysisComplete || item.isAnalyzing) return;
    
    item.isAnalyzing = true;
    item.showOverlay = true;
    
    // Simulate AI analysis with realistic delay
    setTimeout(() => {
      // Mock AI analysis results
      const insights = [
        'High quality materials detected',
        'Popular design trending now',
        'Excellent customer satisfaction',
        'Premium brand recognition',
        'Sustainable production methods'
      ];
      
      const ratings = [4.2, 4.5, 4.7, 4.3, 4.6, 4.8, 4.1];
      
      item.aiRating = ratings[Math.floor(Math.random() * ratings.length)];
      item.aiInsights = insights[Math.floor(Math.random() * insights.length)];
      item.isGoodValue = item.basePriceBBcoin < 100 || item.aiRating > 4.5;
      item.analysisComplete = true;
      item.isAnalyzing = false;
      item.showOverlay = false;
    }, 1500 + Math.random() * 1000); // 1.5-2.5 second delay for realism
  }

  openImageModal(item: any): void {
    const dialogRef = this.dialog.open(ImagePreviewDialog, {
      data: { 
        imageUrl: item.imageUrl, 
        name: item.name,
        description: item.description,
        aiInsights: item.aiInsights,
        aiRating: item.aiRating
      },
      panelClass: 'image-modal',
      maxWidth: '90vw',
      maxHeight: '90vh'
    });
  }

  analyzeAllImages(): void {
    // Analyze all items that haven't been analyzed yet
    const unanalyzedItems = this.merchandise.filter(item => !item.analysisComplete && !item.isAnalyzing);
    
    unanalyzedItems.forEach((item, index) => {
      setTimeout(() => {
        this.analyzeImage(item);
      }, index * 500); // Stagger the analysis
    });

    // Hide the button after a delay
    setTimeout(() => {
      this.allAnalyzed = true;
    }, unanalyzedItems.length * 500 + 2000);
  }
}

// Image Preview Dialog Component
@Component({
  selector: 'image-preview-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <div class="image-preview-container">
      <div class="preview-header">
        <h2>{{ data.name }}</h2>
        <button mat-icon-button (click)="closeDialog()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      
      <div class="preview-content">
        <div class="image-section">
          <img [src]="data.imageUrl" [alt]="data.name" class="preview-image">
          
          <div class="image-controls">
            <button mat-fab color="primary" (click)="zoomIn()">
              <mat-icon>zoom_in</mat-icon>
            </button>
            <button mat-fab color="primary" (click)="zoomOut()">
              <mat-icon>zoom_out</mat-icon>
            </button>
            <button mat-fab color="primary" (click)="resetZoom()">
              <mat-icon>center_focus_strong</mat-icon>
            </button>
          </div>
        </div>
        
        <div class="info-section">
          <div class="description">
            <h3>Description</h3>
            <p>{{ data.description }}</p>
          </div>
          
          <div class="ai-analysis" *ngIf="data.aiInsights">
            <h3>AI Analysis</h3>
            <div class="analysis-card">
              <mat-icon>psychology</mat-icon>
              <div class="analysis-content">
                <p>{{ data.aiInsights }}</p>
                <div class="rating" *ngIf="data.aiRating">
                  <mat-icon>star</mat-icon>
                  <span>{{ data.aiRating }}/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .image-preview-container {
      padding: 0;
      max-width: 90vw;
      max-height: 90vh;
      overflow: hidden;
      border-radius: 16px;
    }
    
    .preview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      background: linear-gradient(45deg, #ffd600, #ff8f00);
      color: #333;
    }
    
    .preview-header h2 {
      margin: 0;
      font-weight: 600;
    }
    
    .preview-content {
      display: flex;
      height: calc(90vh - 80px);
    }
    
    .image-section {
      flex: 2;
      position: relative;
      overflow: hidden;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .preview-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      transition: transform 0.3s ease;
      transform: scale(var(--zoom, 1));
    }
    
    .image-controls {
      position: absolute;
      bottom: 16px;
      right: 16px;
      display: flex;
      gap: 8px;
      flex-direction: column;
    }
    
    .info-section {
      flex: 1;
      padding: 24px;
      background: white;
      overflow-y: auto;
    }
    
    .description h3,
    .ai-analysis h3 {
      color: #333;
      margin-bottom: 12px;
      font-weight: 600;
    }
    
    .description p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    
    .analysis-card {
      display: flex;
      gap: 12px;
      padding: 16px;
      background: linear-gradient(45deg, #e3f2fd, #bbdefb);
      border-radius: 12px;
      color: #1976d2;
    }
    
    .analysis-card mat-icon {
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
    }
    
    .analysis-content {
      flex: 1;
    }
    
    .analysis-content p {
      margin: 0 0 8px 0;
      font-weight: 500;
    }
    
    .rating {
      display: flex;
      align-items: center;
      gap: 4px;
      font-weight: 600;
    }
    
    .rating mat-icon {
      color: #ffd600;
      font-size: 1.2rem;
      width: 1.2rem;
      height: 1.2rem;
    }
  `]
})
export class ImagePreviewDialog {
  private zoomLevel = 1;

  constructor(
    public dialogRef: MatDialogRef<ImagePreviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  zoomIn(): void {
    this.zoomLevel = Math.min(this.zoomLevel + 0.25, 3);
    this.updateZoom();
  }

  zoomOut(): void {
    this.zoomLevel = Math.max(this.zoomLevel - 0.25, 0.5);
    this.updateZoom();
  }

  resetZoom(): void {
    this.zoomLevel = 1;
    this.updateZoom();
  }

  private updateZoom(): void {
    const imageElement = document.querySelector('.preview-image') as HTMLElement;
    if (imageElement) {
      imageElement.style.setProperty('--zoom', this.zoomLevel.toString());
    }
  }
}