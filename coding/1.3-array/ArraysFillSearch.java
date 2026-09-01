import java.util.Arrays;

public class ArraysFillSearch {
    public static void main(String[] args) {
        int[] scores = new int[5];
        Arrays.fill(scores, 0);
        System.out.println("filled=" + Arrays.toString(scores));

        int[] marks = {80, 70, 90, 60, 85};
        Arrays.sort(marks);
        System.out.println("sorted=" + Arrays.toString(marks));

        // binarySearch needs a sorted array
        int index = Arrays.binarySearch(marks, 80);
        System.out.println("found 80 at " + index);
    }
}
