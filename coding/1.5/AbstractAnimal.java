public class AbstractAnimal {
    public static void main(String[] args) {
        AbsAnimal dog = new AbsDog();
        AbsAnimal cat = new AbsCat();
        dog.eat();
        dog.sound();
        cat.eat();
        cat.sound();
    }
}

abstract class AbsAnimal {
    abstract void sound();

    void eat() {
        System.out.println("Eating");
    }
}

class AbsDog extends AbsAnimal {
    void sound() {
        System.out.println("Dog barks");
    }
}

class AbsCat extends AbsAnimal {
    void sound() {
        System.out.println("Cat meows");
    }
}
