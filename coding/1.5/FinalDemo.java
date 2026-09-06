public class FinalDemo {
    public static void main(String[] args) {
        BreathDog dog = new BreathDog();
        dog.breathe();
        System.out.println(BreathAnimal.MAX_AGE);
    }
}

class BreathAnimal {
    public static final int MAX_AGE = 100;

    final void breathe() {
        System.out.println("Breathing");
    }
}

class BreathDog extends BreathAnimal {
    // cannot override breathe()
    // String is also final — cannot write: class MyString extends String
}
