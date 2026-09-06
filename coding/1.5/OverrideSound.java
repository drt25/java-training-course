public class OverrideSound {
    public static void main(String[] args) {
        SoundDog dog = new SoundDog();
        SoundCat cat = new SoundCat();
        dog.sound();
        cat.sound();
    }
}

class SoundAnimal {
    void sound() {
        System.out.println("Animal makes sound");
    }
}

class SoundDog extends SoundAnimal {
    void sound() {
        System.out.println("Dog barks");
    }
}

class SoundCat extends SoundAnimal {
    void sound() {
        System.out.println("Cat meows");
    }
}
