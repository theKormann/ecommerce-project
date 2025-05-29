package com.hovetlilicao.infra.services;

import com.hovetlilicao.domain.models.User;
import com.hovetlilicao.infra.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public User createUser(String nome, String email, String password, String role) {
        if (userRepository.existsByEmail(email)){
            throw new IllegalArgumentException("O email já está em uso.");
        }
        String encodedPassword = passwordEncoder.encode(password);
        User user = new User();
        user.setNome(nome);
        user.setEmail(email);
        user.setPassword(encodedPassword);
        user.setRole(role);

        return userRepository.save(user);
    }
}
