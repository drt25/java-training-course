import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class PaymentWorkers {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newFixedThreadPool(3);

        pool.submit(new PayTask("TXN-1", 150));
        pool.submit(new PayTask("TXN-2", 590));
        pool.submit(new PayTask("TXN-3", 1200));

        pool.shutdown();
    }
}

class PayTask implements Runnable {
    String id;
    int amount;

    PayTask(String id, int amount) {
        this.id = id;
        this.amount = amount;
    }

    public void run() {
        System.out.println(id + " Rs. " + amount + " on " + Thread.currentThread().getName());
    }
}
