public class PrintArgs {
    public static void main(String[] args) {
        System.out.println("You passed " + args.length + " argument(s).");
        for (int i = 0; i < args.length; i++) {
            System.out.println((i + 1) + ": " + args[i]);
        }
    }
}
