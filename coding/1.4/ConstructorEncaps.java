public class ConstructorEncaps {
    public static void main(String[] args) {
        SafeAccount ram = new SafeAccount("Ram", 15000);
        ram.deposit(500);
        System.out.println(ram.getName() + " " + ram.getBalance());

        SafeAccount empty = new SafeAccount("Hari");
        System.out.println(empty.getName() + " " + empty.getBalance());
    }
}

class SafeAccount {
    private String name;
    private int balance;

    SafeAccount(String name, int balance) {
        this.name = name;
        this.balance = balance;
    }

    SafeAccount(String name) {
        this(name, 0);
    }

    String getName() {
        return name;
    }

    int getBalance() {
        return balance;
    }

    void deposit(int amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
}
