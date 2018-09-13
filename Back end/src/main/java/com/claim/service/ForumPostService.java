package com.claim.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.claim.repository.ForumPostRepository;

import com.claim.entity.ForumPost;

@Service
public class ForumPostService {
	
	@Autowired
	ForumPostRepository forumPostRepository;
	
	public void savePost(ForumPost post) {
		forumPostRepository.save(post);
	}
	
	public List<ForumPost> getPosts() {
		return forumPostRepository.findAll();
	}
}
