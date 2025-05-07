package com.hovetlilicao.ecommerce.dto.auth;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class AuthRequest {

    @NotBlank(message = "username ou email é necessário para o Login!")
    private String login;

    @NotBlank(message = "É necessário preencher este campo!")
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    private String password;

}
