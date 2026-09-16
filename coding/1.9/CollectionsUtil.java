import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CollectionsUtil {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>();
        numbers.add(50);
        numbers.add(10);
        numbers.add(30);
        numbers.add(20);

        Collections.sort(numbers);
        System.out.println("sort=" + numbers);

        Collections.reverse(numbers);
        System.out.println("reverse=" + numbers);

        System.out.println("min=" + Collections.min(numbers));
        System.out.println("max=" + Collections.max(numbers));

        Collections.shuffle(numbers);
        System.out.println("shuffle=" + numbers);
    }
}
