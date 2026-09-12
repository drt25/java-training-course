public class PolyLoop {
    public static void main(String[] args) {
        LoopAnimal[] animals = {
            new LoopDog(),
            new LoopCat(),
            new LoopDog()
        };

        for (LoopAnimal animal : animals) {
            animal.sound();
        }
    }
}

class LoopAnimal {
    void sound() {
        System.out.println("Animal sound");
    }
}

class LoopDog extends LoopAnimal {
    void sound() {
        System.out.println("Dog barks");
    }
}

class LoopCat extends LoopAnimal {
    void sound() {
        System.out.println("Cat meows");
    }
}
