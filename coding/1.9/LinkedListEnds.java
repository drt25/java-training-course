import java.util.LinkedList;

public class LinkedListEnds {
    public static void main(String[] args) {
        LinkedList<String> names = new LinkedList<>();
        names.addFirst("John");
        names.addLast("Sarah");
        System.out.println(names);

        names.removeFirst();
        names.removeLast();
        System.out.println("after remove ends=" + names);
    }
}
