public class MethodsDemo {
    public static void main(String[] args) {
        greet("Ram");
        System.out.println("2+3=" + add(2, 3));
        print("Hello");
        print("Hello", 2);

        int[] marks = {80, 70, 90};
        System.out.println("sum=" + sum(marks));
        System.out.println("max=" + max(marks));
        System.out.println("avg=" + average(marks));
    }

    static void greet(String name) {
        System.out.println("Namaste, " + name);
    }

    static int add(int a, int b) {
        return a + b;
    }

    static void print(String text) {
        System.out.println(text);
    }

    static void print(String text, int times) {
        for (int i = 0; i < times; i++) {
            System.out.println(text);
        }
    }

    static int sum(int[] marks) {
        int total = 0;
        for (int m : marks) {
            total += m;
        }
        return total;
    }

    static int max(int[] marks) {
        int best = marks[0];
        for (int m : marks) {
            if (m > best) {
                best = m;
            }
        }
        return best;
    }

    static double average(int[] marks) {
        return (double) sum(marks) / marks.length;
    }
}
