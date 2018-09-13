package com.claim.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.claim.entity.User;

public interface UserRepository extends JpaRepository<User, String> {

	
	@Query(value="Select * from users where username like %?1%", nativeQuery = true)
	public List<User> search (String name);
	
	@Query(value="Select * from users order by email", nativeQuery = true)
	public List<User> getUsers();
}
