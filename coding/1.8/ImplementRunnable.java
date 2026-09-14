public class ImplementRunnable {
    public static void main(String[] args) {
        Thread t1 = new Thread(new HelloTask("One"));
        Thread t2 = new Thread(new HelloTask("Two"));
        t1.start();
        t2.start();
    }
}

class HelloTask implements Runnable {
    String label;

    HelloTask(String label) {
        this.label = label;
    }

    public void run() {
        System.out.println("Hello from " + label);
    }
}
