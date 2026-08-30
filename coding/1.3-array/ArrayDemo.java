import java.util.Arrays;

public class ArrayDemo {
    public static void main(String[] args) {
        int[] marks = {80, 70, 90};
        System.out.println("length=" + marks.length);
        System.out.println("index 0=" + marks[0]);
        for (int m : marks) {
            System.out.println(m);
        }

        System.out.println(Arrays.toString(marks));
        Arrays.sort(marks);
        System.out.println("sorted=" + Arrays.toString(marks));

        int[] copy = Arrays.copyOf(marks, marks.length);
        System.out.println("copy=" + Arrays.toString(copy));
        System.out.println("found 80 at " + Arrays.binarySearch(marks, 80));
    }
}
