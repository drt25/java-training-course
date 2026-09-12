import java.io.File;
import java.io.IOException;

public class FileManage {
    public static void main(String[] args) {
        File file = new File("student.txt");

        System.out.println(file.exists());
        System.out.println(file.getName());

        try {
            if (file.createNewFile()) {
                System.out.println("File created.");
            } else {
                System.out.println("File already exists.");
            }
        } catch (IOException e) {
            System.out.println("Error creating file.");
        }
    }
}
