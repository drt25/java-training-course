import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectDemo {
    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/",
                    "root",
                    "password");
            System.out.println("Connected.");
            con.close();
        } catch (ClassNotFoundException e) {
            System.out.println("Driver not found. Put the JAR in lib/ and add it to the classpath.");
        } catch (SQLException e) {
            System.out.println("Could not connect.");
        }
    }
}
