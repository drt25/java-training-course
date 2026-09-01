import java.util.Arrays;

public class StudentMarks {

    public static final int MAX_MARKS = 100;

    public static void printMarks(int[] marks) {
        for (int mark : marks) {
            System.out.println(mark);
        }
    }

    public static int calculateTotal(int[] marks) {
        int totalMarks = 0;
        for (int mark : marks) {
            totalMarks += mark;
        }
        return totalMarks;
    }

    public static void main(String[] args) {
        int[] studentMarks = {80, 75, 90, 85, 70};

        printMarks(studentMarks);

        int totalMarks = calculateTotal(studentMarks);

        System.out.println("Total: " + totalMarks);
        System.out.println("Marks: " + Arrays.toString(studentMarks));
        System.out.println("Max allowed: " + MAX_MARKS);
    }
}
