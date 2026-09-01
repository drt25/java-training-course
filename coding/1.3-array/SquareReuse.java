public class SquareReuse {
    public static void main(String[] args) {
        System.out.println(square(5));
        System.out.println(square(10));
        System.out.println(square(20));
    }

    static int square(int n) {
        return n * n;
    }
}
