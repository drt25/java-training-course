import java.io.File;
import java.io.IOException;
import java.util.Scanner;

public class TokenRead {
    public static void main(String[] args) {
        try {
            Scanner scanner = new Scanner(new File("student.txt"));
            while (scanner.hasNext()) {
                String token = scanner.next();
                System.out.println(token);
            }
            scanner.close();
        } catch (IOException e) {
            System.out.println("Error reading file.");
        }
    }
}
