public class ObjectToString {
    public static void main(String[] args) {
        PrintDog dog = new PrintDog("Tommy");
        System.out.println(dog);
    }
}

class PrintDog {
    private String name;

    PrintDog(String name) {
        this.name = name;
    }

    public String toString() {
        return name;
    }
}
