enum TxnType {
    DEPOSIT, WITHDRAW
}

public class BreakContinueReturn {
    public static void main(String[] args) {
        TxnType type = TxnType.DEPOSIT;
        System.out.println("txn=" + type);

        System.out.println("-- break at 5 --");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) {
                break;
            }
            System.out.println(i);
        }

        System.out.println("-- continue skip 3 --");
        for (int i = 1; i <= 5; i++) {
            if (i == 3) {
                continue;
            }
            System.out.println(i);
        }

        checkAge(16);
        checkAge(20);
    }

    public static void checkAge(int age) {
        if (age < 18) {
            System.out.println(age + " -> return (not adult)");
            return;
        }
        System.out.println(age + " -> You are an adult.");
    }
}
