package com.hovetlilicao.security.JwtAuth;

import com.hovetlilicao.domain.models.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class JwtService {

    private static final Logger logger = LoggerFactory.getLogger(JwtService.class);

    @Value("${jwt.secret}")
    private String secretKey;

    private final Long EXPIRATION_TIME_MS = 86400000L;

    private Key getSignInKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String generateToken(UserDetails userDetails) {
        logger.info("Gerando token para: {}", userDetails.getUsername());
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_MS))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        try {
            Claims claims = extractClaims(token);
            String username = claims.getSubject();
            logger.info("Claims extraídas do token:", claims);
            if (username == null) {
                logger.warn("Nome de usuário não encontrado nas claims do token");
            }
            return username;
        } catch (MalformedJwtException e) {
            logger.error("Token malformado: {}", token, e);
            throw new IllegalArgumentException("Token malformado", e);
        } catch (ExpiredJwtException e) {
            logger.error("Token expirado: {}", token, e);
            throw new IllegalStateException("Token expirado", e);
        } catch (Exception e) {
            logger.error("Erro ao extrair claims do token: {}", token, e);
            throw new IllegalStateException("Erro ao extrair claims do token", e);
        }
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            String username = extractUsername(token);
            boolean valid = username.equals(userDetails.getUsername()) && !isTokenExpired(token);
            logger.info("Token válido: {}", valid);
            return valid;
        } catch (IllegalArgumentException e) {
            logger.warn("Token malformado ou inválido: {}", e.getMessage());
            return false;
        } catch (ExpiredJwtException e) {
            logger.warn("Token expirado: {}", e.getMessage());
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        Date expiration = extractClaims(token).getExpiration();
        boolean expired = expiration.before(new Date());
        if (expired) {
            logger.warn("Token expirado em: {}", expiration);
        }
        return expired;
    }

    private Claims extractClaims(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSignInKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            logger.info("Claims extraídas com sucesso: {}", claims);
            return claims;
        } catch (JwtException e) {
            logger.error("Erro ao processar o token: {}", token, e);
            throw new MalformedJwtException("Token inválido ou malformado", e);
        }
    }

    public String generateResetToken(User user){
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(Date.from(Instant.now().plus(15, ChronoUnit.MINUTES)))
                .claim("type", "reset")
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Boolean isResetToken(String token){
        try {
            Claims claims = extractClaims(token);
            return claims.get("type").equals("reset") && !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

}
