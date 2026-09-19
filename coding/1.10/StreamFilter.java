import java.util.Arrays;
import java.util.List;

public class StreamFilter {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(10, 20, 30, 40, 50);

        numbers.stream()
                .filter(n -> n > 20)
                .forEach(n -> System.out.println(n));
    }
}
