package com.example.expensetracker.expense;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @Transactional(readOnly = true)
    public List<ExpenseResponse> findAll() {
        return expenseRepository.findAll()
            .stream()
            .map(ExpenseResponse::fromEntity)
            .toList();
    }

    @Transactional
    public ExpenseResponse create(CreateExpenseRequest request) {
        Expense expense = new Expense();
        expense.setDescription(request.description().trim());
        expense.setAmount(request.amount());
        expense.setDate(request.date());
        expense.setCategory(request.category());

        Expense savedExpense = expenseRepository.save(expense);
        return ExpenseResponse.fromEntity(savedExpense);
    }

    @Transactional
    public void deleteById(Long id) {
        expenseRepository.deleteById(id);
    }
}
