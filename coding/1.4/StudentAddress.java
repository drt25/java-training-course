public class StudentAddress {
    public static void main(String[] args) {
        Address home = new Address("Tinkune", "Kathmandu");
        Student ram = new Student("Ram", home);
        System.out.println(ram.name + " " + ram.address.city);
    }
}

class Address {
    String street;
    String city;

    Address(String street, String city) {
        this.street = street;
        this.city = city;
    }
}

class Student {
    String name;
    Address address;

    Student(String name, Address address) {
        this.name = name;
        this.address = address;
    }
}
