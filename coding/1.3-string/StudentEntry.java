//Name, Country, PhoneNumber, Address
//Country ('NEPAL', ' Nepal', 'nepal')
//PhoneNumber should start with 98 || 97
//PhoneNumber should be 10 digit
//Address (-) kathmandu-32--> kathmandu 32
import java.util.Scanner;
public class StudentEntry{
    public static void main(String[] args){
        Scanner scanner= new Scanner(System.in);
        System.out.println("Welcome to student entry system !!!");

        System.out.println("Please Enter your name:");
        String name = scanner.nextLine();

        System.out.println("Please Enter Country(eg. Nepal || nepal):");
        String country = scanner.nextLine();

        if(!country.equalsIgnoreCase("NEPAL")){
            //country not equals to nepal
             System.out.println("Entry from only nepal is allowed.");
             System.exit(0);
        }

        System.out.println("Please Enter you phone number:");
        String phoneNumber = scanner.nextLine();

        if(phoneNumber.length() != 10){
            System.out.println("Please enter 10 digit phone number.");
            System.exit(0);
        }

        // if(!phoneNumber.startsWith("97")){
        //     System.out.println("This is not nepali number.");
        //     System.exit(0);
        // }

        if(!phoneNumber.startsWith("98")){
            System.out.println("This is not nepali number.");
            System.exit(0);
        }


        System.out.println("Please Enter you address:");
        String address = scanner.nextLine();

        address = address.replace("-"," ");

        System.out.println("Entered details are: ");
        System.out.println("Name: "+name);
        System.out.println("Country: "+country);
        System.out.println("phone number: "+phoneNumber);
        System.out.println("address: "+address);
    }
}