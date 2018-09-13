package com.claim.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.claim.repository.ForumCommentRepository;

import com.claim.entity.ForumComment;

@Service
public class ForumCommentService {
	
	@Autowired
	ForumCommentRepository forumCommentRepository;
	
	public void saveComment(ForumComment comment) {
		forumCommentRepository.save(comment);
	}
	
	public List<ForumComment> getComments(String id) {
		
		return forumCommentRepository.findComments(Integer.parseInt(id));
	}
}
