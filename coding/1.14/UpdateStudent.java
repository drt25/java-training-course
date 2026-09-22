import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class UpdateStudent {
    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/college",
                    "root",
                    "password");
            Statement stmt = con.createStatement();
            stmt.executeUpdate(
                    "UPDATE student SET address = 'Lalitpur' WHERE id = 1");
            System.out.println("Student updated.");
            con.close();
        } catch (ClassNotFoundException e) {
            System.out.println("Driver not found. Put the JAR in lib/ and add it to the classpath.");
        } catch (SQLException e) {
            System.out.println("Could not update student.");
        }
    }
}
