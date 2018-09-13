package com.claim.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.claim.entity.User;
import com.claim.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	public void saveUser(User user) {
		userRepository.save(user);
	}
	
	public List<User> getUsers() {
		return userRepository.getUsers();
	}
	
	public boolean userExists(User user) {
		User u = userRepository.findById(user.getEmail()).orElse(new User());
		if(u.getEmail() == null)
			return false;
		else
			return true;
	}
	
	public List<User> search(String username) {
		return userRepository.search(username);
	}
	
	public User getUser(String email) {
		Optional<User> userEntity =  userRepository.findById(email);
		return userEntity.get();
	}

}
