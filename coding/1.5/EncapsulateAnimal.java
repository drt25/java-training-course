public class EncapsulateAnimal {
    public static void main(String[] args) {
       EncAnimal animal1 = new EncAnimal();
       animal1.setName("Dog");
       animal1.setAge(2);

       System.out.println("Animal name is: "+animal1.getName()+ " and age is: "+animal1.getAge());
    }
}

class EncAnimal {
    private String name;
    private int age;

    public void setName(String name){
        this.name = name;
    }

    public void setAge(int age){
        if(age<1){
            System.out.println("Age should be 1 or more.");
            System.exit(0);
        }
        this.age = age;
    }

    public String getName(){
        return name;
    }

    public int getAge(){
        return age;
    }
}
