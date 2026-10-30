package com.example.calculator;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CalculatorTest {

    @Test
    void testAddition() {
        Calculator calculator = new Calculator();
        int result = calculator.add(10, 20);
        assertEquals(30, result);
    }

    @Test
    void testSubtraction() {
        Calculator calculator = new Calculator();
        int result = calculator.subtract(20, 10);
        assertEquals(10, result);
    }

    @Test
    void testMultiplication() {
        Calculator calculator = new Calculator();
        int result = calculator.multiply(6, 7);
        assertEquals(42, result);
    }

    @Test
    void testDivision() {
        Calculator calculator = new Calculator();
        int result = calculator.divide(20, 5);
        assertEquals(4, result);
    }
}
