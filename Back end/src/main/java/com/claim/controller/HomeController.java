package com.claim.controller;


import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import java.util.List;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.claim.entity.ForumPost;
import com.claim.entity.ForumComment;
import com.claim.entity.Message;
import com.claim.entity.Review;
import com.claim.entity.User;
import com.claim.service.EmailService;
import com.claim.service.ForumCommentService;
import com.claim.service.ForumPostService;
import com.claim.service.UserService;
import com.claim.service.ReviewService;

@RestController
@CrossOrigin
public class HomeController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	EmailService emailService;
	
	@Autowired
	ReviewService reviewService;
	
	@Autowired
	ForumPostService forumPostService;
	
	@Autowired
	ForumCommentService forumCommentService;
	
	@RequestMapping(value="/getReview", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Review>> getReview(String gameID) {
		List<Review> theReviews = reviewService.getReviews(gameID);
		return new ResponseEntity<>(theReviews, HttpStatus.OK);
	}
	
	@RequestMapping(value="/postReview", method=RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<HttpStatus> postReview(@RequestBody Review review) {
		reviewService.saveReview(review);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/login", method=RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> login(@RequestBody User user) {
		User u = userService.getUser(user.getEmail());
		if (u == null || u.getPassword() == null) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} if (u.getPassword().equals(user.getPassword())) {
			return new ResponseEntity<>(u, HttpStatus.OK);
		} else 
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	}
	

	@RequestMapping(value="/contact", method=RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE,  produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<HttpStatus> contactAdmin(@RequestBody Message message) {
		if (message == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		System.out.println("Email: " + message.getEmail() + "Message: " + message.getMessage());
		
		if (!isValidEmailAddress(message.getEmail()))
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		
		this.emailService.sendEmail("ramibitar1996@gmail.com", "Contact from: " + message.getEmail(), message.getUsername() + ": " + message.getMessage());
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/createUser", method=RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE,  produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<HttpStatus> save(@RequestBody User user) {
		if (user == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		if (!isValidEmailAddress(user.getEmail()) || userService.userExists(user))
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		
		List<User> allUsers = userService.getUsers(); 
			for (User u: allUsers) {
				if (u.getUsername().equalsIgnoreCase(user.getUsername()))
					return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
			}
		userService.saveUser(user);
		this.emailService.sendEmail(user.getEmail(), "Registration", "Hello " + user.getUsername() + "! Thank you for registering to Honest Game Reviews.");
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/fetchGameList", method=RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> fetchGames(String page, String name, String platformID, String id) {
		String apikey = "422cec7f0f149bde7959e87eb82e1d9fa7a35dbf39339b9568c25147661d5ffa";
		String include = "boxart";
		String path;
		String baseUrl = "https://api.thegamesdb.net/Games";
		String fields = "overview,rating,youtube";

		RestTemplate restTemplate = new RestTemplate();

		
		HttpHeaders headers = new HttpHeaders();
		headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
		
		if (name != null) {
			path = "/ByGameName";
		} else {
			path = "/ByGameID";
		}
		UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(baseUrl + path)
		 .queryParam("apikey", apikey)
		 .queryParam("filter[platform]", platformID)
		 .queryParam("include", include)
		 .queryParam("fields", fields);
		
		if (name != null) {
			builder = builder.queryParam("name", name);
		} else {
			builder = builder.queryParam("id", id);
		}
		
		builder = builder.queryParam("page", page);
		
		
		//REMEMBER TO DECODE
		String url = null;
		try {
			 url = URLDecoder.decode(builder.toUriString(), "ISO-8859-1");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} 
		System.out.println(url);
		String response = restTemplate.getForObject(url, String.class);
		
		return new ResponseEntity<>(response, HttpStatus.OK); 
		
	}
	
	@RequestMapping(value="/getPosts", method=RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ForumPost>> getPosts() {
		return new ResponseEntity<>(forumPostService.getPosts(), HttpStatus.OK);
	}
	
	@RequestMapping(value="/newPost", method=RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<HttpStatus> submitPost(@RequestBody ForumPost post) {
		
		forumPostService.savePost(post);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/getComments", method=RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ForumComment>> getComments(String postID) {
		System.out.println("HIIIII OVER HERE DUMMY: " + postID);
		return new ResponseEntity<>(forumCommentService.getComments(postID), HttpStatus.OK);
	}
	
	@RequestMapping(value="/newComment", method=RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<HttpStatus> submitComment(@RequestBody ForumComment comment) {
		
		forumCommentService.saveComment(comment);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	
	public static boolean isValidEmailAddress(String email) {
		   boolean result = true;
		   try {
		      InternetAddress emailAddr = new InternetAddress(email);
		      emailAddr.validate();
		   } catch (AddressException ex) {
		      result = false;
		   }
		   return result;
	}
				
}
