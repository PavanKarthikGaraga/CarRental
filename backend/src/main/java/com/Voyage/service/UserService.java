package com.Voyage.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Voyage.model.User;
import com.Voyage.repository.UserRepository;

@Service
public class UserService {

	  @Autowired
	  private UserRepository userRepo;
	  

	  public String addUser(User u) {
	    userRepo.save(u);
	    return "User Data Inserted Successfully...!!!";
	  }

	  public List<User> viewAllUser() {
	    return userRepo.findAll();
	  }
	  
	  public User findByEmail(String email){
		  Optional<User> user = userRepo.findByEmail(email);
		  return user.orElse(null); 
	  }

	  public User viewUserById(Long id) {
	    Optional<User> user = userRepo.findById(id);
	    return user.orElse(null);
	  }

	  public String updateUser(Long userId, User user) {
	    Optional<User> existingUser = userRepo.findById(userId);
	    
	    if(existingUser.isPresent()) {
	      User existing = existingUser.get();
	      existing.setName(user.getName());
	      existing.setPassword(user.getPassword());
	      existing.setEmail(user.getEmail());
	      
	      // Only allow role update if not changing to ADMIN
	      if (!"Admin".equalsIgnoreCase(user.getRole())) {
	          existing.setRole(user.getRole());
	      } else {
	          return "Permission Declined: Cannot set role to Admin";
	      }
	      
	      userRepo.save(existing);
	      return "User Updated Successfully";
	    }
	    else
	      return "User ID Not Found";
	  }

	  public String deleteUser(Long id) {
	    Optional<User> user = userRepo.findById(id);
	    if(user.isPresent()) {
	      userRepo.deleteById(id);
	      return "User With ID " + id + " Deleted Successfully...!!!";
	    }
	    else
	      return "User ID Not Found";
	  }
}