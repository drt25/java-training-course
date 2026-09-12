import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class DataRead {
    public static void main(String[] args) {
        try {
            DataInputStream input =
                    new DataInputStream(
                            new FileInputStream("student.dat"));
            int id = input.readInt();
            String name = input.readUTF();
            double marks = input.readDouble();
            input.close();

            System.out.println(id);
            System.out.println(name);
            System.out.println(marks);
        } catch (IOException e) {
            System.out.println("Error reading data.");
        }
    }
}
