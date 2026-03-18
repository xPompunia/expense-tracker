import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category, Expense } from './models/expense.model';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { FiltersListComponent } from './filters-list/filters-list.component';
import { ExpenseHeaderComponent } from './expense-header/expense-header.component';
import { ExpenseService } from './services/expense.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ExpenseFormComponent,
    ExpenseListComponent,
    FiltersListComponent,
    ExpenseHeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Śledzenie Wydatków';

  expenses: Expense[] = [];
  isLoading = false;
  errorMessage = '';

  readonly categories: Category[] = [
    'Jedzenie',
    'Transport',
    'Rozrywka',
    'Inne',
  ];

  filterCategory: Category | 'Wszystkie' = 'Wszystkie';
  private readonly expenseService = inject(ExpenseService);

  ngOnInit(): void {
    this.loadExpenses();
  }

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

  loadExpenses() {
    this.errorMessage = '';
    this.isLoading = true;

    this.expenseService
      .getExpenses()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (expenses) => {
          this.expenses = expenses;
        },
        error: (error: Error) => {
          this.errorMessage = error.message;
        },
      });
  }

  addExpense(newExpenseData: {
    description: string;
    amount: number;
    category: Category;
  }) {
    this.errorMessage = '';

    this.expenseService.addExpense(newExpenseData).subscribe({
      next: (createdExpense) => {
        this.expenses = [createdExpense, ...this.expenses];
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
      },
    });
  }

  deleteExpense(id: number) {
    this.errorMessage = '';

    this.expenseService.deleteExpense(id).subscribe({
      next: () => {
        this.expenses = this.expenses.filter((expense) => expense.id !== id);
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
      },
    });
  }
}
