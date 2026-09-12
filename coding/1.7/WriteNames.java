import java.io.FileWriter;
import java.io.IOException;

public class WriteNames {
    public static void main(String[] args) {
        try {
            FileWriter writer = new FileWriter("student.txt");
            writer.write("John");
            writer.write("\nSarah");
            writer.close();
            System.out.println("Names saved.");
        } catch (IOException e) {
            System.out.println("Error writing file.");
        }
    }
}
