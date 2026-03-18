import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ExpenseService } from './expense.service';

describe('ExpenseService', () => {
  let service: ExpenseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExpenseService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ExpenseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should map GET expenses response to frontend model', () => {
    service.getExpenses().subscribe((expenses) => {
      expect(expenses.length).toBe(1);
      expect(expenses[0].category).toBe('Jedzenie');
      expect(expenses[0].date instanceof Date).toBeTrue();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/expenses');
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: 1,
        description: 'Kawa',
        amount: 12.5,
        date: '2026-03-18',
        category: 'JEDZENIE',
      },
    ]);
  });

  it('should send mapped category when creating expense', () => {
    service
      .addExpense({ description: 'Bilet', amount: 4.9, category: 'Transport' })
      .subscribe((expense) => {
        expect(expense.category).toBe('Transport');
        expect(expense.description).toBe('Bilet');
      });

    const req = httpMock.expectOne('http://localhost:8080/api/expenses');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.category).toBe('TRANSPORT');

    req.flush({
      id: 2,
      description: 'Bilet',
      amount: 4.9,
      date: '2026-03-18',
      category: 'TRANSPORT',
    });
  });
});
