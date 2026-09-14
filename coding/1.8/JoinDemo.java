public class JoinDemo {
    static int total = 0;

    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(new AddOneToFive());
        t.start();
        t.join();
        System.out.println("Total: " + total);
    }
}

class AddOneToFive implements Runnable {
    public void run() {
        for (int n = 1; n <= 5; n++) {
            JoinDemo.total = JoinDemo.total + n;
        }
    }
}
