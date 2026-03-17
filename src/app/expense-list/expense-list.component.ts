import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expense } from '../models/expense.model';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css',
})
export class ExpenseListComponent {
  @Input() expenses: Expense[] = [];
  @Output() deleteExpense = new EventEmitter<number>();

  onDeleteClick(id: number) {
    this.deleteExpense.emit(id);
  }
}
