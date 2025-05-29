package com.hovetlilicao.infra.services.auth;

import com.hovetlilicao.infra.repositories.UserRepository;
import com.hovetlilicao.security.JwtAuth.JwtService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ResetPasswordService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final JavaMailSender mailSender;
    private final PasswordEncoder passwordEncoder;

    public void sendResetLink(String email) {
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário com e-mail '" + email + "' não encontrado."));

        String token = jwtService.generateResetToken(user);
        String link = "http://localhost:3000/reset-password?token=" + token;

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(email);
            helper.setFrom("petstorelilicao@gmail.com");
            helper.setSubject("Redefinição de senha - Hovet Lilicao");

            String text = "Olá " + user.getNome() + ",\n\n" +
                    "Recebemos uma solicitação para redefinir sua senha. Para continuar, clique no link abaixo:\n\n" +
                    link + "\n\n" +
                    "Se você não solicitou essa alteração, ignore este e-mail.\n\n" +
                    "Atenciosamente,\nEquipe Hovet Lilicão";

            helper.setText(text);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Falha ao enviar e-mail de redefinição de senha", e);
        }
    }

    public void resetPassword(String token, String newPassword) {
        if (!jwtService.isResetToken(token)) {
            throw new IllegalArgumentException("Token de redefinição de senha expirado ou inválido.");
        }

        String email = jwtService.extractUsername(token);
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário com e-mail '" + email + "' não encontrado."));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
