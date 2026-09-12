public class PolyNewType {
    public static void main(String[] args) {
        FarmAnimal[] animals = {
            new FarmDog(),
            new FarmCat(),
            new FarmCow()
        };

        for (FarmAnimal animal : animals) {
            animal.sound();
        }
    }
}

class FarmAnimal {
    void sound() {
        System.out.println("Animal sound");
    }
}

class FarmDog extends FarmAnimal {
    void sound() {
        System.out.println("Dog barks");
    }
}

class FarmCat extends FarmAnimal {
    void sound() {
        System.out.println("Cat meows");
    }
}

class FarmCow extends FarmAnimal {
    void sound() {
        System.out.println("Cow moos");
    }
}
