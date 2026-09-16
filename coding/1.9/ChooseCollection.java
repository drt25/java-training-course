import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class ChooseCollection {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("John");
        names.add("Sarah");
        names.add("John");

        Set<String> emails = new HashSet<>();
        emails.add("john@gmail.com");
        emails.add("sarah@gmail.com");
        emails.add("john@gmail.com");

        Map<Integer, String> students = new HashMap<>();
        students.put(101, "John");
        students.put(102, "Sarah");

        System.out.println("List names=" + names);
        System.out.println("Set emails=" + emails);
        System.out.println("Map 102=" + students.get(102));
    }
}
