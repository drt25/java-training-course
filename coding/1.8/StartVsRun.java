public class StartVsRun {
    public static void main(String[] args) {
        NamedJob a = new NamedJob("A");
        NamedJob b = new NamedJob("B");

        System.out.println("run() uses the main thread");
        a.run();
        b.run();

        System.out.println("start() starts new threads");
        a.start();
        b.start();
    }
}

class NamedJob extends Thread {
    String label;

    NamedJob(String label) {
        this.label = label;
    }

    public void run() {
        System.out.println(label + " on " + Thread.currentThread().getName());
    }
}
