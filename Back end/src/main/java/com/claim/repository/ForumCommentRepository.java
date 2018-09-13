package com.claim.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.claim.entity.ForumComment;

public interface ForumCommentRepository extends JpaRepository<ForumComment, Integer> {

	@Query(value="Select C from ForumComment C where C.postID = ?1")
	public List<ForumComment> findComments(int gameID);
}
