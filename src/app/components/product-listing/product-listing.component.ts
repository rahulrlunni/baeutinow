import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductListingComponent {
  @Input() products: any[] = [];
}