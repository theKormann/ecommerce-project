package com.hovetlilicao.ecommerce.controllers;


import com.hovetlilicao.ecommerce.dto.auth.AuthRequest;
import com.hovetlilicao.ecommerce.dto.auth.AuthResponse;
import com.hovetlilicao.ecommerce.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signIn")
    public ResponseEntity<AuthResponse> signIn(@RequestBody @Valid AuthRequest request){
        AuthResponse.response = authService.signIn(request);
        return ResponseEntity.ok(response);
    }
}
