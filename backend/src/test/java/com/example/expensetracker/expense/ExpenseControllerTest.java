package com.example.expensetracker.expense;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.hasItem;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ExpenseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldCreateExpense() throws Exception {
        String payload = """
            {
              \"description\": \"Kawa\",
              \"amount\": 14.50,
              \"date\": \"2026-03-18\",
              \"category\": \"JEDZENIE\"
            }
            """;

        mockMvc.perform(post("/api/expenses")
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").isNumber())
            .andExpect(jsonPath("$.description").value("Kawa"))
            .andExpect(jsonPath("$.category").value("JEDZENIE"));
    }

    @Test
    void shouldReturnAllExpenses() throws Exception {
        String payload = """
            {
              \"description\": \"Bilet\",
              \"amount\": 4.90,
              \"date\": \"2026-03-18\",
              \"category\": \"TRANSPORT\"
            }
            """;

        mockMvc.perform(post("/api/expenses")
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
            .andExpect(status().isCreated());

        mockMvc.perform(get("/api/expenses"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[*].description", hasItem("Bilet")));
    }
}
