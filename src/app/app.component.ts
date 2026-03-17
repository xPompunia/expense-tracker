import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category, Expense } from './models/expense.model';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { FiltersListComponent } from "./filters-list/filters-list.component";
import { ExpenseHeaderComponent } from './expense-header/expense-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ExpenseFormComponent, ExpenseListComponent, FiltersListComponent, ExpenseHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Śledzenie Wydatków';

  expenses: Expense[] = [];

  readonly categories: Category[] = [
    'Jedzenie',
    'Transport',
    'Rozrywka',
    'Inne',
  ];

  filterCategory: Category | 'Wszystkie' = 'Wszystkie';

  get filteredExpenses(): Expense[] {
    if (this.filterCategory === 'Wszystkie') {
      return this.expenses;
    }
    return this.expenses.filter(
      (expense) => expense.category === this.filterCategory,
    );
  }

  get totalExpenses(): number {
    return this.filteredExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
  }

  setFilterCategory(category: Category | 'Wszystkie') {
    this.filterCategory = category;
  }

  addExpense(newExpenseData: {
    description: string;
    amount: number;
    category: Category;
  }) {
    this.expenses.push({
      id: Date.now(),
      description: newExpenseData.description,
      amount: newExpenseData.amount,
      date: new Date(),
      category: newExpenseData.category,
    });
  }

  deleteExpense(id: number) {
    this.expenses = this.expenses.filter((expense) => expense.id !== id);
  }
}
