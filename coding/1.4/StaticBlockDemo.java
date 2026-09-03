public class StaticBlockDemo {
    static {
        System.out.println("Bank ready");
    }

    public static void main(String[] args) {
        System.out.println("main runs after the static block");
    }
}
