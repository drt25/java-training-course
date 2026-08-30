public class SwitchDemo {
    public static void main(String[] args) {
        int choice = 1;

        System.out.println("-- without break (fall through) --");
        switch (choice) {
            case 1:
                System.out.println("Deposit");
            case 2:
                System.out.println("Withdraw");
            default:
                System.out.println("Invalid");
        }

        System.out.println("-- with break --");
        switch (choice) {
            case 1:
                System.out.println("Deposit");
                break;
            case 2:
                System.out.println("Withdraw");
                break;
            default:
                System.out.println("Invalid");
        }

        System.out.println("-- modern -> (no fall through) --");
        switch (choice) {
            case 1 -> System.out.println("Deposit");
            case 2 -> System.out.println("Withdraw");
            default -> System.out.println("Invalid");
        }
    }
}
