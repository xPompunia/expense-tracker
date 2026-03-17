export type Category = 'Jedzenie' | 'Transport' | 'Rozrywka' | 'Inne';

export interface Expense {
  id: number;
  description: string;
  amount: number;
  date: Date;
  category: Category;
}
