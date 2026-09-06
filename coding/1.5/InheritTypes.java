public class InheritTypes {
    public static void main(String[] args) {
        FamilyDog dog = new FamilyDog();
        FamilyCat cat = new FamilyCat();
        dog.eat();
        cat.eat();
    }
}

class FamilyAnimal {
    void eat() {
        System.out.println("Animal is eating");
    }
}

// multilevel: Animal → Mammal → Dog
class Mammal extends FamilyAnimal {
}

class FamilyDog extends Mammal {
}

// hierarchical: Animal → Cat as well
class FamilyCat extends FamilyAnimal {
}

// a class cannot extend two classes
// class Wrong extends FamilyDog, FamilyCat { }
