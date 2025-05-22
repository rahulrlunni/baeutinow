import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatBadgeModule, MatSelectModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // search text initialized to an empty string
  searchText = '';
  
  // Method to handle the search input change
  @Output() searchChanged = new EventEmitter<string>();
  // This method emits the search text to the parent component
  onSearchChange() {
    this.searchChanged.emit(this.searchText.trim());
  }
}
