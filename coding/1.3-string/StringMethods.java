public class StringMethods {
    public static void main(String[] args) {
        String left = "Ram";
        String right = "ram";
        System.out.println("equals=" + left.equals(right));
        System.out.println("equalsIgnoreCase=" + left.equalsIgnoreCase(right));
        System.out.println("contains=" + "eSewa wallet".contains("wallet"));
        System.out.println("startsWith=" + "9812345678".startsWith("98"));
        System.out.println("indexOf=" + "Hello Java".indexOf("Java"));
        System.out.println("substring=" + "Hello Java".substring(6));

        String csv = "Ram,Sita,Hari";
        String[] names = csv.split(",");
        for (String n : names) {
            System.out.println("split=" + n);
        }

        String raw = "  ram  ";
        System.out.println("trim=[" + raw.trim() + "]");
        System.out.println("upper=" + "hello".toUpperCase());
        System.out.println("replace=" + "98-1234-5678".replace("-", ""));
        System.out.println("concat=" + "Ram".concat(" Kumar"));
        System.out.println("isEmpty=" + "".isEmpty());
        System.out.println("isBlank=" + "   ".isBlank());
    }
}
