public class AccountMethods {
    public static void main(String[] args) {
        BankAccount ram = new BankAccount();
        ram.name = "Ram";
        ram.balance = 15000;
        ram.deposit(500);
        ram.print();

        BankAccount hari = new BankAccount();
        hari.name = "Hari";
        hari.balance = 8000;
        hari.deposit(200);
        hari.print();
    }
}

class BankAccount {
    String name;
    int balance;

    void deposit(int amount) {
        balance += amount;
    }

    void print() {
        System.out.println(name + " " + balance);
    }
}
