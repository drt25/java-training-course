public class ImmutabilityDemo {
    public static void main(String[] args) {
        String name = "Ram";
        name.concat(" Kumar");
        System.out.println("concat without assign: " + name);

        name = name.concat(" Kumar");
        System.out.println("concat with assign: " + name);

        String text = "hello";
        text.toUpperCase();
        System.out.println("upper without assign: " + text);
        text = text.toUpperCase();
        System.out.println("upper with assign: " + text);

        String a = "Java";
        String b = a;
        a = "Python";
        System.out.println("a=" + a);
        System.out.println("b=" + b);

        String t = "Hello";
        System.out.println("before +  id=" + System.identityHashCode(t));
        t = t + " World";
        System.out.println("after +   id=" + System.identityHashCode(t));
        System.out.println("now t=" + t);
    }
}
