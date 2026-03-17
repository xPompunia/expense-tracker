import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../models/expense.model';

@Component({
  selector: 'app-filters-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filters-list.component.html',
  styleUrl: './filters-list.component.css',
})
export class FiltersListComponent {
  @Input() categories: Category[] = [];
  @Input() selectedCategory: Category | 'Wszystkie' = 'Wszystkie';
  @Output() filterChange = new EventEmitter<Category | 'Wszystkie'>();

  onFilterChange(category: Category | 'Wszystkie') {
    this.filterChange.emit(category);
  }
}
