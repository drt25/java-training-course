import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class InsertStudent {
    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/college",
                    "root",
                    "password");
            Statement stmt = con.createStatement();
            stmt.executeUpdate(
                    "INSERT INTO student VALUES (1, 'Ram', 'Kathmandu', 101)");
            stmt.executeUpdate(
                    "INSERT INTO student VALUES (2, 'Sita', 'Pokhara', 102)");
            System.out.println("Students inserted.");
            con.close();
        } catch (ClassNotFoundException e) {
            System.out.println("Driver not found. Put the JAR in lib/ and add it to the classpath.");
        } catch (SQLException e) {
            System.out.println("Could not insert students.");
        }
    }
}
