package com.example;

import java.sql.Connection;
import java.sql.DriverManager;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/college";
        String username = "root";
        String password = "password";
        try {
            Connection connection =
                    DriverManager.getConnection(url, username, password);
            System.out.println("Database connected successfully!");
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
