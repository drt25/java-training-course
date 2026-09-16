import java.util.ArrayList;
import java.util.List;

public class ListDemo {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("John");
        names.add("Sarah");
        names.add("John");

        System.out.println(names);
        System.out.println("get(0)=" + names.get(0));
        System.out.println("size=" + names.size());
    }
}
