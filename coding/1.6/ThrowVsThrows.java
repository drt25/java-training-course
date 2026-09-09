public class ThrowVsThrows {
    public static void main(String[] args) {
        try {
            check(-1);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    static void check(int n) throws Exception {
        if (n < 0) {
            throw new Exception("n must be positive");
        }
        System.out.println(n);
    }
}
