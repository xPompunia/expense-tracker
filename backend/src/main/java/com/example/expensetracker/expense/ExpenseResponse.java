package com.example.expensetracker.expense;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ExpenseResponse(
    Long id,
    String description,
    BigDecimal amount,
    LocalDate date,
    Category category
) {
    static ExpenseResponse fromEntity(Expense expense) {
        return new ExpenseResponse(
            expense.getId(),
            expense.getDescription(),
            expense.getAmount(),
            expense.getDate(),
            expense.getCategory()
        );
    }
}
