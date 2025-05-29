package com.hovetlilicao.infra.services.auth;

import com.hovetlilicao.api.dto.auth.AuthRequest;
import com.hovetlilicao.api.dto.auth.AuthResponse;
import com.hovetlilicao.api.dto.auth.UserDTO;
import com.hovetlilicao.infra.repositories.UserRepository;
import com.hovetlilicao.security.JwtAuth.JwtService;
import lombok.RequiredArgsConstructor;
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

    public AuthResponse signIn(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getLogin(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmailOrNome(request.getLogin(), request.getLogin())
                .orElseThrow(() -> new UsernameNotFoundException("Credenciais inválidas"));

        String jwt = jwtService.generateToken(user);

        UserDTO userDTO = new UserDTO(user.getNome(), user.getEmail());

        return new AuthResponse(jwt, userDTO, user.getRole());
    }
}
