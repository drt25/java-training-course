import java.util.Arrays;
import java.util.List;

public class StreamMap {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4);
        numbers.stream()
                .map(n -> n * 2)
                .forEach(n -> System.out.println(n));

        List<String> names = Arrays.asList("ram", "sita", "hari");
        names.stream()
                .map(name -> name.toUpperCase())
                .forEach(name -> System.out.println(name));
    }
}
