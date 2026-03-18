package com.example.expensetracker.expense;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateExpenseRequest(
    @NotBlank @Size(max = 200) String description,
    @NotNull @DecimalMin(value = "0.01") BigDecimal amount,
    @NotNull LocalDate date,
    @NotNull Category category
) {
}
