import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class PoolDemo {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newFixedThreadPool(3);
        pool.submit(new PoolPay("ATM", 800));
        pool.submit(new PoolPay("Mobile", 500));
        pool.submit(new PoolPay("QR", 150));
        pool.submit(new PoolPay("Counter", 200));
        pool.shutdown();
    }
}

class PoolPay implements Runnable {
    String who;
    int amount;

    PoolPay(String who, int amount) {
        this.who = who;
        this.amount = amount;
    }

    public void run() {
        System.out.println(who + " Rs. " + amount
                + " on " + Thread.currentThread().getName());
    }
}
