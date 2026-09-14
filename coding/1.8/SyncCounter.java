public class SyncCounter {
    static int balance = 1000;

    public static synchronized void withdraw(String who, int amount) {
        if (balance >= amount) {
            balance = balance - amount;
            System.out.println(who + " took Rs. " + amount);
        } else {
            System.out.println(who + " failed. Not enough money.");
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Thread atm = new Thread(new SafePay("ATM", 800));
        Thread mobile = new Thread(new SafePay("Mobile", 800));
        atm.start();
        mobile.start();
        atm.join();
        mobile.join();
        System.out.println("Balance: Rs. " + balance);
    }
}

class SafePay implements Runnable {
    String who;
    int amount;

    SafePay(String who, int amount) {
        this.who = who;
        this.amount = amount;
    }

    public void run() {
        SyncCounter.withdraw(who, amount);
    }
}
