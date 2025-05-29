package com.hovetlilicao.api.controllers.auth;

import com.hovetlilicao.api.dto.auth.*;
import com.hovetlilicao.domain.models.User;
import com.hovetlilicao.infra.repositories.UserRepository;
import com.hovetlilicao.infra.services.UserService;
import com.hovetlilicao.infra.services.auth.AuthService;
import com.hovetlilicao.infra.services.auth.ResetPasswordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final ResetPasswordService resetPasswordService;
    private final UserRepository userRepository;

    @PostMapping("/signIn")
    public ResponseEntity<AuthResponse> signIn(@RequestBody @Valid AuthRequest request) {
        AuthResponse response = authService.signIn(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User registerUser(@RequestBody @Valid RegisterRequest request) {
        return userService.createUser(
                request.getNome(),
                request.getEmail(),
                request.getPassword(),
                "ROLE_USER"
        );
    }

    @PostMapping("/forget-password")
    public ResponseEntity<?> forgotPassword(@RequestBody @Valid ForgotPasswordRequest request) {
        resetPasswordService.sendResetLink(request.getEmail());
        return ResponseEntity.ok("E-mail de recuperação enviado.");
    }

    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody @Valid RegisterNewPassword request) {
        try {
            resetPasswordService.resetPassword(request.getToken(), request.getNewPassword());
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Senha redefinida com sucesso"
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", e.getMessage()
            ));
        }
    }

    @PatchMapping("/{id}/role")
    public ResponseEntity<?> newRole(@PathVariable Long id, @RequestBody Map<String, String> body){
        String newRole = body.get("role");
        Optional<User> optional = userRepository.findById(id);
        if (optional.isPresent()) {
            User user = optional.get();
            user.setRole(newRole.toUpperCase());
            return ResponseEntity.ok(userRepository.save(user));
        }
        return ResponseEntity.notFound().build();
    }


}
