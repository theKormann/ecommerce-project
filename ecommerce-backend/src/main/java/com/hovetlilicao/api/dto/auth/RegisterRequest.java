package com.hovetlilicao.api.dto.auth;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank
    private String nome;

    @NotBlank
    @Email
    private String email;

    @NotBlank(message = "Digite a sua senha, por favor.")
    @Size(min = 8, max = 100, message = "min 8 caracteres")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$",
            message = "A senha deve conter ao menos 8 caracteres, incluindo maiúscula, minúscula, número e símbolo."
    )
    private String password;
}
