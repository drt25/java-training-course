import java.util.HashMap;
import java.util.Map;

public class MapDemo {
    public static void main(String[] args) {
        Map<Integer, String> students = new HashMap<>();
        students.put(101, "John");
        students.put(102, "Sarah");
        students.put(103, "David");

        System.out.println(students.get(101));
        System.out.println(students.get(102));
    }
}
