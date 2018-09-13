package com.claim;

import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class EmailConfig {
	
	@Bean
	public JavaMailSender mailSender() {
		JavaMailSenderImpl emailConfig = new JavaMailSenderImpl();
		emailConfig.setHost("smtp.gmail.com");
		emailConfig.setPort(587);
		
		emailConfig.setUsername("ramiemailsender@gmail.com");
		emailConfig.setPassword("123Password");
		
		Properties props = emailConfig.getJavaMailProperties();
		props.put("mail.transport.protocol", "smtp");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.debug", "true");		
		return emailConfig;
	}
}
