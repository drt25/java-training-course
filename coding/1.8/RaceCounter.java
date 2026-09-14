public class RaceCounter {
    static int balance = 1000;

    public static void main(String[] args) throws InterruptedException {
        Thread atm = new Thread(new RacePay("ATM", 800));
        Thread mobile = new Thread(new RacePay("Mobile", 800));
        atm.start();
        mobile.start();
        atm.join();
        mobile.join();
        System.out.println("Balance: Rs. " + balance);
    }

    static void withdraw(String who, int amount) {
        if (balance >= amount) {
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
            }
            balance = balance - amount;
            System.out.println(who + " took Rs. " + amount);
        } else {
            System.out.println(who + " failed. Not enough money.");
        }
    }
}

class RacePay implements Runnable {
    String who;
    int amount;

    RacePay(String who, int amount) {
        this.who = who;
        this.amount = amount;
    }

    public void run() {
        RaceCounter.withdraw(who, amount);
    }
}
