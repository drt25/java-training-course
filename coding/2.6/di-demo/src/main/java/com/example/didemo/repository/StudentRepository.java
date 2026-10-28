package com.example.didemo.repository;

import com.example.didemo.model.Student;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class StudentRepository {

    private final List<Student> students = new ArrayList<>();

    public void save(Student student) {
        students.add(student);
        System.out.println("Saved " + student.getName());
    }

    public List<Student> findAll() {
        return students;
    }
}
