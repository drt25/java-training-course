public class InsufficientBalance {
    public static void main(String[] args) {
        BankAccount ram = new BankAccount(500);
        try {
            ram.withdraw(1000);
        } catch (InsufficientBalanceException e) {
            System.out.println(e.getMessage());
        }
    }
}

class InsufficientBalanceException extends Exception {
    InsufficientBalanceException(String message) {
        super(message);
    }
}

class BankAccount {
    private int balance;

    BankAccount(int balance) {
        this.balance = balance;
    }

    void withdraw(int amount) throws InsufficientBalanceException {
        if (amount > balance) {
            throw new InsufficientBalanceException("Insufficient balance.");
        }
        balance -= amount;
        System.out.println("Withdrawal successful.");
    }
}
