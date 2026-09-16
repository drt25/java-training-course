public class InstanceOfDemo {
    public static void main(String[] args) {
        Animal animal = new Dog();

        if (animal instanceof Dog) {
            System.out.println("This is a Dog.");
        }
        if (animal instanceof Animal) {
            System.out.println("This is also an Animal.");
        }
    }
}

class Animal {
}

class Dog extends Animal {
}
