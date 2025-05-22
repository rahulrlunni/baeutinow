import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  imports: [MatIconModule],
  styleUrls: ['./menu.component.scss'],
  standalone: true
})
export class MenuComponent {}