package com.example.grammar.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class GrammarService {

    private final ChatClient chatClient;

    public GrammarService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String correctGrammar(String sentence) {
        return chatClient.prompt()
                .system("Correct the grammar of the given sentence. " +
                        "Return only the corrected sentence.")
                .user(sentence)
                .call()
                .content();
    }
}
