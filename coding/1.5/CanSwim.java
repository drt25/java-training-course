public class CanSwim {
    public static void main(String[] args) {
        SwimDog dog = new SwimDog();
        dog.swim();
        dog.run();
    }
}

interface Swimmable {
    void swim();
}

interface RunnableAnimal {
    void run();
}

class SwimDog implements Swimmable, RunnableAnimal {
    public void swim() {
        System.out.println("Dog swims");
    }

    public void run() {
        System.out.println("Dog runs");
    }
}
