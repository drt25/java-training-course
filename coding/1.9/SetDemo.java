import java.util.HashSet;
import java.util.Set;

public class SetDemo {
    public static void main(String[] args) {
        Set<String> emails = new HashSet<>();
        System.out.println(emails.add("john@gmail.com"));
        System.out.println(emails.add("sarah@gmail.com"));
        System.out.println(emails.add("john@gmail.com"));
        System.out.println(emails);
    }
}
