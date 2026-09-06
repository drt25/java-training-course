public class InheritDog {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.setName("Tommy");
        dog.eat();
        dog.sleep();
        dog.bark();
        dog.run();

        System.out.println("Dog name is: "+dog.getName());
    }
}

class Animal {
    private String name;

    public void setName(String name) {
            this.name = name;
    }

    public String getName() {
        return name;
    }

    void eat() {
        System.out.println("Animal is eating");
    }

    void sleep() {
        System.out.println("Animal is sleeping");
    }
}

class Dog extends Animal {

    void bark(){
        System.out.println("Dog is barking......");
    }

    void run(){
        System.out.println("Dog is running......");
    }
 
}
