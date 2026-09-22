import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class CreateStudentTable {
    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/college",
                    "root",
                    "password");
            Statement stmt = con.createStatement();
            stmt.executeUpdate(
                    "CREATE TABLE student ("
                            + "id INT PRIMARY KEY, "
                            + "name VARCHAR(50), "
                            + "address VARCHAR(100), "
                            + "roll_no INT)");
            System.out.println("Table student created.");
            con.close();
        } catch (ClassNotFoundException e) {
            System.out.println("Driver not found. Put the JAR in lib/ and add it to the classpath.");
        } catch (SQLException e) {
            System.out.println("Could not create table.");
        }
    }
}
