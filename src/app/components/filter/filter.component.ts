import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatSliderModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() availableBrands: string[] = [];
  @Input() availableTypes: string[] = [];
  @Input() availableGenders: string[] = [];
  @Input() availableFragranceFamily: string[] = [];

  @Input() minPrice: number = 0;
  @Input() maxPrice: number = 1000;
  @Input() selectedMinPrice: number = 0;
  @Input() selectedMaxPrice: number = 1000;

  selectedBrand: string = '';
  selectedType: string = '';
  selectedGender: string = '';
  selectedFragranceFamily: string = '';

  @Output() priceRangeChange = new EventEmitter<{min: number, max: number}>();
  @Output() filterChanged = new EventEmitter<{ brand: string; type: string; gender: string; fragranceFamily: string }>();
  @Output() sortChanged = new EventEmitter<string>();
  // Initializing the component with default values
  ngOnInit() {
    if (this.selectedMinPrice === 0) this.selectedMinPrice = this.minPrice;
    if (this.selectedMaxPrice === 0) this.selectedMaxPrice = this.maxPrice;
  }

  // Method to handle the change in the filter options
  onFilterChange() {
    this.filterChanged.emit({
      brand: this.selectedBrand,
      type: this.selectedType,
      gender: this.selectedGender,
      fragranceFamily: this.selectedFragranceFamily
    });
    this.priceRangeChange.emit({ min: this.selectedMinPrice, max: this.selectedMaxPrice });
  }

  // Method to handle the change in the sorting option
  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.sortChanged.emit(value);
  }
}
