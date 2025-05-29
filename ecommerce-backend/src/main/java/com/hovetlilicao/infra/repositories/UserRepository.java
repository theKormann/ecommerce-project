package com.hovetlilicao.infra.repositories;

import com.hovetlilicao.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(Long id);
    Optional<User> findByEmailOrNome(String nome, String email);
    Optional<User> findByNome(String nome);
    Optional<User> findByEmail(String email);
    boolean existsByNome(String nome);
    boolean existsByEmail(String email);
}
