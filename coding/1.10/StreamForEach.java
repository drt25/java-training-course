import java.util.Arrays;
import java.util.List;

public class StreamForEach {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Ram", "Sita", "Hari");

        names.stream()
                .forEach(name -> System.out.println(name));
    }
}
