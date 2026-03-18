import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-header.component.html',
  styleUrl: './expense-header.component.css',
})
export class ExpenseHeaderComponent {
  @Input() totalExpenses: number = 0;
}
