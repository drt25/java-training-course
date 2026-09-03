public class AccountObjects {
    public static void main(String[] args) {
        Account ram = new Account();
        ram.name = "Ram";
        ram.balance = 15000;

        Account hari = new Account();
        hari.name = "Hari";
        hari.balance = 8000;

        System.out.println(ram.name + " " + ram.balance);
        System.out.println(hari.name + " " + hari.balance);
    }
}

class Account {
    String name;
    int balance;
}
