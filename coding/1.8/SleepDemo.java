public class SleepDemo {
    public static void main(String[] args) {
        int sum = 0;
        try {
            for (int n = 1; n <= 5; n++) {
                sum = sum + n;
                System.out.println("Add " + n + " → sum = " + sum);
                Thread.sleep(1000);
            }
        } catch (InterruptedException e) {
            System.out.println("Sleep was interrupted.");
        }
        System.out.println("Done. Sum = " + sum);
    }
}
