import java.util.ArrayList;
import java.util.List;

public class ArrayVsList {
    public static void main(String[] args) {
        String[] months = new String[12];
        months[0] = "January";
        System.out.println("months length=" + months.length);

        List<String> students = new ArrayList<>();
        students.add("John");
        students.add("Sarah");
        students.add("David");
        students.add("Emma");
        students.remove("John");
        System.out.println(students);
        System.out.println("size=" + students.size());
    }
}
