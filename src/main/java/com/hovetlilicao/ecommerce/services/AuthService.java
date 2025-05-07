package com.hovetlilicao.ecommerce.services;


import com.hovetlilicao.ecommerce.dto.auth.AuthRequest;
import com.hovetlilicao.ecommerce.dto.auth.AuthResponse;
import com.hovetlilicao.ecommerce.repository.UserRepository;
import com.hovetlilicao.ecommerce.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthResponse signIn(AuthRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getLogin(),
                        request.getPassword()
                )
        );

        var user = UserRepository.findByUsernameOrEmail(request.getLogin(), request.getPassword())
                .orElseThrow(()  -> new UsernameNotFoundException("Verifique o Email ou senha digitados e tente novamente."));

        String jwt = jwtService.generateToken(user);

        return new AuthResponse(jwt);
    }
}
