import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../components/header/header.component";
import { FilterComponent } from "../../components/filter/filter.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { MenuComponent } from '../../components/menu/menu.component';
import { ProductListingComponent } from '../../components/product-listing/product-listing.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, MenuComponent, ProductListingComponent, HeaderComponent, FilterComponent, PaginationComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  products: Product[] = [];
  currentPage = 1;
  itemsPerPage = 16;

  availableBrands: string[] = [];
  availableTypes: string[] = [];
  availableGenders: string[] = [];
  availableFragranceFamily: string[] = [];

  selectedGender: string = '';
  selectedFragranceFamily: string = '';

  // Filtering, sorting, and search state
  searchTerm = '';
  selectedBrand = '';
  selectedType = '';
  sortOption = '';
  // injecting the services from product service
  constructor(private productService: ProductService) {}
  // Fetching the products from the product service and initializing the filter options
  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.extractFilterOptions();
    });
  }
  // Extracting the unique brands from the products
  get brands(): string[] {
    const brands = new Set(this.products.map(p => p.brand));
    return Array.from(brands).sort();
  }
  // Extracting the unique types from the products
  get types(): string[] {
    const types = new Set(
      this.products.flatMap(p => p.attributes?.type || [])
    );
    return Array.from(types).sort();
  }
  // filtering the products based on the selected filters
  get filteredProducts(): Product[] {
    let filtered = this.products;
    // Filtering based on selected Brand
    if (this.selectedBrand) {
      filtered = filtered.filter(p => p.brand === this.selectedBrand);
    }
    // Filtering based on selected Type
    if (this.selectedType) {
      filtered = filtered.filter(p => (p.attributes?.type || []).includes(this.selectedType));
    }
    // Filtering based on selected Gender
    if (this.selectedGender) {
      filtered = filtered.filter(p => (p.attributes?.Gender || []).includes(this.selectedGender));
    }
    // Filtering based on selected Fragrance Family
    if (this.selectedFragranceFamily) {
      filtered = filtered.filter(p => (p.attributes?.Main_Accords || []).includes(this.selectedFragranceFamily));
    }
    // Filtering based on search term  
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(term));
    }
    // Sorting the filtered products based on the selected sort option
    switch (this.sortOption) {
      case 'price-asc':
        filtered = filtered.slice().sort((a, b) => a.min_price - b.min_price);
        break;
      case 'price-desc':
        filtered = filtered.slice().sort((a, b) => b.min_price - a.min_price);
        break;
      case 'name-asc':
        filtered = filtered.slice().sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered = filtered.slice().sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    // returning the filtered products and sorting products
    return filtered;
  }
  // emited value from filter component
  onFilterChanged(filters: { brand: string; type: string; gender: string, fragranceFamily: string }): void {
    this.selectedBrand = filters.brand;
    this.selectedType = filters.type;
    this.selectedGender = filters.gender;
    this.selectedFragranceFamily = filters.fragranceFamily;
    this.currentPage = 1;
  }
  // extracting the filtered options from the products to map for filtering options
  extractFilterOptions(): void {
    const brands = new Set<string>();
    const types = new Set<string>();
    const genders = new Set<string>();
    const fragranceFamily = new Set<string>();

    this.products.forEach(p => {
      if (p.brand) brands.add(p.brand);
      if (p.attributes?.type) p.attributes.type.forEach(t => types.add(t));
      if (p.attributes?.Gender) p.attributes.Gender.forEach(g => genders.add(g));
      if (p.attributes?.Main_Accords) p.attributes.Main_Accords.forEach(f => fragranceFamily.add(f));
    });

    this.availableBrands = Array.from(brands).sort();
    this.availableTypes = Array.from(types).sort();
    this.availableGenders = Array.from(genders).sort();
    this.availableFragranceFamily = Array.from(fragranceFamily).sort();
  }

  // Returns a subset of filtered products for the current page based on pagination.
  // Calculates the start index from the current page and items per page,
  // then slices the filtered product list accordingly.

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

    // Computes an array of page numbers for pagination based on
    // the total number of filtered products and the number of items per page.
     
  get totalPages(): number[] {
    return Array(Math.ceil(this.filteredProducts.length / this.itemsPerPage)).fill(0).map((_, i) => i + 1);
  }
  // Updates the current page number for pagination.
  setPage(page: number): void {
    this.currentPage = page;
  }
  // Emited search term from the header component
  onSearch(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
  }
// Emited Brand change from the filter component
  onBrandChange(brand: string): void {
    this.selectedBrand = brand;
    this.currentPage = 1;
  }
  // Emited type from the filter component

  onTypeChange(type: string): void {
    this.selectedType = type;
    this.currentPage = 1;
  }
  // Emited sort option from the filter component
  onSortChange(option: string): void {
    this.sortOption = option;
    this.currentPage = 1;
  }
}
