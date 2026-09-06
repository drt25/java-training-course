public class PolyAnimal {
    public static void main(String[] args) {
        ZooAnimal a = new ZooDog();
        ZooAnimal b = new ZooCat();
        ZooAnimal c = new ZooAnimal();
        a.sound();
        b.sound();
        c.sound();
    }
}

class ZooAnimal {
    void sound() {
        System.out.println("Animal sound");
    }
}

class ZooDog extends ZooAnimal {
    void sound() {
        System.out.println("Dog barks");
    }
}

class ZooCat extends ZooAnimal {
    void sound() {
        System.out.println("Cat meows");
    }
}
