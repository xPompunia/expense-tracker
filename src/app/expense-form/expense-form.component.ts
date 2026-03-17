import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../models/expense.model';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css',
})
export class ExpenseFormComponent {
  @Input() categories: Category[] = [];

  newDescription: string = '';
  newAmount: number | null = null;
  newCategory: Category = 'Inne';

  @Output() add = new EventEmitter<{
    description: string;
    amount: number;
    category: Category;
  }>();

  submitForm() {
    if (this.newDescription.trim() && this.newAmount && this.newAmount > 0) {
      this.add.emit({
        description: this.newDescription.trim(),
        amount: this.newAmount,
        category: this.newCategory,
      });
      this.newDescription = '';
      this.newAmount = null;
      this.newCategory = 'Inne';
    }
  }
}
