package com.hovetlilicao.ecommerce.security;


import com.hovetlilicao.ecommerce.models.User;
import lombok.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;
}