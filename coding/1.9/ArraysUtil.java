import java.util.Arrays;

public class ArraysUtil {
    public static void main(String[] args) {
        int[] numbers = {50, 10, 30, 20};
        int[] same = {10, 20, 30, 50};

        System.out.println(Arrays.toString(numbers));
        Arrays.sort(numbers);
        System.out.println("sorted=" + Arrays.toString(numbers));
        System.out.println("equals=" + Arrays.equals(numbers, same));
    }
}
