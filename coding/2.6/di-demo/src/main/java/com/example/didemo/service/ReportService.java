package com.example.didemo.service;

import com.example.didemo.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final StudentRepository repository;

    public int count() {
        return repository.findAll().size();
    }
}
