public class ExtendThread {
    public static void main(String[] args) {
        HelloThread t1 = new HelloThread("One");
        HelloThread t2 = new HelloThread("Two");
        t1.start();
        t2.start();
    }
}

class HelloThread extends Thread {
    String label;

    HelloThread(String label) {
        this.label = label;
    }

    public void run() {
        System.out.println("Hello from " + label);
    }
}
