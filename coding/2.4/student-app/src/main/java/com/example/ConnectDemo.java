package com.example;

import org.hibernate.Session;

public class ConnectDemo {

    public static void main(String[] args) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        System.out.println("Connected.");
        session.close();
    }
}
