import java.io.DataOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class DataWrite {
    public static void main(String[] args) {
        try {
            DataOutputStream output =
                    new DataOutputStream(
                            new FileOutputStream("student.dat"));
            output.writeInt(101);
            output.writeUTF("John");
            output.writeDouble(85.5);
            output.close();
            System.out.println("Student data saved.");
        } catch (IOException e) {
            System.out.println("Error writing data.");
        }
    }
}
