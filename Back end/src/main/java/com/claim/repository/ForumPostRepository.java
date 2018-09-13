package com.claim.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.claim.entity.ForumPost;

public interface ForumPostRepository  extends JpaRepository<ForumPost, Integer> {

	
}
