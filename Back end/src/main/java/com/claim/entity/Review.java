package com.claim.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="Reviews")
public class Review {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO) 
	private int id;
	
	@Column(name = "review", length = 5000)
	private String review;
		
	@Column
	private int rating;

	
	@Column(name = "username", length = 12, nullable = false)
	private String username;
	
	@Column(name = "gameID", nullable = false)
	private int gameID;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getReview() {
		return review;
	}
	public void setReview(String review) {
		this.review = review;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getGameID() {
		return gameID;
	}
	public void setGameID(int gameID) {
		this.gameID = gameID;
	}
	public String getReviewMessage() {
		return review;
	}
	public void setReviewMessage(String reviewMessage) {
		this.review = reviewMessage;
	}

	public int getRating() {
		return rating;
	}
	public void setRating(int newRate) {
		this.rating = newRate;
	}	
}
