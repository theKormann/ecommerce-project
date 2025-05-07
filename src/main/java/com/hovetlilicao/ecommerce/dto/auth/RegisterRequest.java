package com.hovetlilicao.ecommerce.dto.auth;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank
    private String username;
    @NotBlank
    private String email;

    @NotBlank(message = "Digite a sua senha por favor.")
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    private String password;

}
