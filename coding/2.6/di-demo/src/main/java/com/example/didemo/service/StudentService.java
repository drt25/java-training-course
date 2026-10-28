package com.example.didemo.service;

import com.example.didemo.model.Student;
import com.example.didemo.repository.StudentRepository;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public void register(Student student) {
        repository.save(student);
    }
}
