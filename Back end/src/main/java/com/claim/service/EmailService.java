package com.claim.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	
	@Autowired
	private JavaMailSender emailSender;
	
	public void sendEmail(String toEmail, String subject, String message) {
		SimpleMailMessage emailData = new SimpleMailMessage();
		emailData.setTo(toEmail);
		emailData.setSubject(subject);
		emailData.setText(message);
		emailSender.send(emailData);
	}
	
}
