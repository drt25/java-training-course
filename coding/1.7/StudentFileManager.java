import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class StudentFileManager {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter student name: ");
        String name = scanner.nextLine();
        System.out.print("Enter marks: ");
        int marks = scanner.nextInt();

        try {
            File file = new File("students.txt");
            FileWriter writer = new FileWriter(file);
            writer.write("Name: " + name + "\n");
            writer.write("Marks: " + marks);
            writer.close();
            System.out.println("Student information saved.");

            System.out.println();
            System.out.println("Stored Student:");
            FileReader reader = new FileReader(file);
            int data;
            while ((data = reader.read()) != -1) {
                System.out.print((char) data);
            }
            reader.close();
            System.out.println();
        } catch (IOException e) {
            System.out.println("Error with the student file.");
        }

        scanner.close();
    }
}
