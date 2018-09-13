package com.claim.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.claim.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
	
	@Query(value="Select R from Review R where R.gameID = ?1")
	public List<Review> getReviews(int gameID);
}
