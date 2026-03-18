import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Category, Expense } from '../models/expense.model';

type ApiCategory = 'JEDZENIE' | 'TRANSPORT' | 'ROZRYWKA' | 'INNE';

interface ApiExpense {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: ApiCategory;
}

interface CreateExpensePayload {
  description: string;
  amount: number;
  date: string;
  category: ApiCategory;
}

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly apiUrl = 'http://localhost:8080/api/expenses';

  constructor(private readonly http: HttpClient) {}

  getExpenses(): Observable<Expense[]> {
    return this.http.get<ApiExpense[]>(this.apiUrl).pipe(
      map((expenses) =>
        expenses.map((expense) => this.fromApiExpense(expense)),
      ),
      catchError((error) => this.handleError(error)),
    );
  }

  addExpense(data: {
    description: string;
    amount: number;
    category: Category;
  }): Observable<Expense> {
    const payload: CreateExpensePayload = {
      description: data.description,
      amount: data.amount,
      date: new Date().toISOString().slice(0, 10),
      category: this.toApiCategory(data.category),
    };

    return this.http.post<ApiExpense>(this.apiUrl, payload).pipe(
      map((expense) => this.fromApiExpense(expense)),
      catchError((error) => this.handleError(error)),
    );
  }

  deleteExpense(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private fromApiExpense(expense: ApiExpense): Expense {
    return {
      id: expense.id,
      description: expense.description,
      amount: expense.amount,
      date: new Date(expense.date),
      category: this.fromApiCategory(expense.category),
    };
  }

  private toApiCategory(category: Category): ApiCategory {
    const mapping: Record<Category, ApiCategory> = {
      Jedzenie: 'JEDZENIE',
      Transport: 'TRANSPORT',
      Rozrywka: 'ROZRYWKA',
      Inne: 'INNE',
    };

    return mapping[category];
  }

  private fromApiCategory(category: ApiCategory): Category {
    const mapping: Record<ApiCategory, Category> = {
      JEDZENIE: 'Jedzenie',
      TRANSPORT: 'Transport',
      ROZRYWKA: 'Rozrywka',
      INNE: 'Inne',
    };

    return mapping[category];
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(() => new Error('Brak polaczenia z backendem.'));
    }

    return throwError(
      () => new Error(`Blad API (${error.status}). Sprobuj ponownie.`),
    );
  }
}
