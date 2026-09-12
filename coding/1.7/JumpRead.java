import java.io.IOException;
import java.io.RandomAccessFile;

public class JumpRead {
    public static void main(String[] args) {
        try {
            RandomAccessFile file =
                    new RandomAccessFile("student.txt", "r");
            file.seek(5);
            System.out.println((char) file.read());
            file.close();
        } catch (IOException e) {
            System.out.println("Error reading file.");
        }
    }
}
