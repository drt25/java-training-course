import java.math.BigDecimal;

public class TypesDemo {
    public static void main(String[] args) {
        int salary = 50000;
        long population = 10_000_000_000L;
        double graph = 0.1 + 0.2;
        char grade = 'A';
        boolean active = true;

        Integer boxed = salary; // autoboxing
        int n = Integer.parseInt("25");
        long value = Long.parseLong("100000");
        double price = Double.parseDouble("99.99");

        BigDecimal next = new BigDecimal("1500.50").subtract(new BigDecimal("200.00"));

        System.out.println("salary=" + salary + " boxed=" + boxed);
        System.out.println("population=" + population + " grade=" + grade + " active=" + active);
        System.out.println("0.1 + 0.2 (double) = " + graph);
        System.out.println("parsed: " + n + ", " + value + ", " + price);
        System.out.println("BigDecimal 1500.50 - 200.00 = " + next);
    }
}
