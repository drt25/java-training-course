public class FinallyDemo {
    public static void main(String[] args) {
        try {
            System.out.println("Trying...");
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Error occurred.");
        } finally {
            System.out.println("This always executes.");
        }
    }
}
