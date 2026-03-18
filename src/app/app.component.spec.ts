import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ExpenseService } from './services/expense.service';

class ExpenseServiceMock {
  getExpenses = jasmine.createSpy('getExpenses').and.returnValue(of([]));
  addExpense = jasmine.createSpy('addExpense');
  deleteExpense = jasmine.createSpy('deleteExpense');
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: ExpenseService, useClass: ExpenseServiceMock }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Śledzenie Wydatków' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Śledzenie Wydatków');
  });

  it('should render header title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Śledzenie Wydatków',
    );
  });
});
