import java.util.Scanner;

public class DivideCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the first number:");
        int firstNumber = scanner.nextInt();
        System.out.println("Enter the second number:");
        int secondNumber = scanner.nextInt();

        try {
            int result = firstNumber / secondNumber;
            System.out.println("Result is: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero.");
        } finally {
            scanner.close();
            System.out.println("Thank you for using this calculator.");
        }
    }
}
