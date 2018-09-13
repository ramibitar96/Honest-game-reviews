package com.claim.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.claim.entity.Review;
import com.claim.repository.ReviewRepository;

@Service
public class ReviewService {

	@Autowired
	ReviewRepository reviewRepository;
	
	public List<Review> getReviews(String gameID) {
		int gameAsInt = Integer.parseInt(gameID);
		return reviewRepository.getReviews(gameAsInt);
	}
	
	public void saveReview(Review review) {
		List<Review> reviews = reviewRepository.findAll();
		for (Review r : reviews) {
			if (r.getGameID() == review.getGameID() && r.getUsername().equals(review.getUsername())) {
				r.setRating(review.getRating());
				r.setReviewMessage(review.getReviewMessage());
				reviewRepository.save(r);
				return;
			}
		}
		reviewRepository.save(review);
	}
	
}
