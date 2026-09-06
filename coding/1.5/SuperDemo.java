public class SuperDemo {
    public static void main(String[] args) {
        SuperDog dog = new SuperDog("Tommy");
        dog.eat();
    }
}

class SuperAnimal {
    private String name;

    SuperAnimal(String name) {
        this.name = name;
        System.out.println("Animal: " + name);
    }

    void eat() {
        System.out.println("Animal is eating");
    }
}

class SuperDog extends SuperAnimal {
    SuperDog(String name) {
        super(name);
        System.out.println("Dog: " + name);
    }

    void eat() {
        super.eat();
        System.out.println("Dog is eating");
    }
}
