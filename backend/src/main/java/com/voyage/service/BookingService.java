package com.voyage.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.voyage.model.Booking;
import com.voyage.model.Car;
import com.voyage.model.User;
import com.voyage.repository.BookingRepository;
import com.voyage.repository.CarRepository;
import com.voyage.repository.UserRepository;

@Service
public class BookingService {

	  @Autowired
	  private BookingRepository bookingRepo;
	  
	  @Autowired
	  private CarRepository carRepo;
	  
	  @Autowired
	  private UserRepository userRepo;
	  
	  public String addBooking(Booking b) {
		  // Fetch and attach the real Car entity
		  Car car = carRepo.findById(b.getCar().getId()).orElse(null);
		  if (car == null) {
			  throw new RuntimeException("Car not found");
		  }
		  // Fetch and attach the real User entity
		  User customer = userRepo.findById(b.getCustomer().getId()).orElse(null);
		  if (customer == null) {
			  throw new RuntimeException("Customer not found");
		  }
		  // Set references
		  b.setCar(car);
		  b.setCustomer(customer);

		  // Update car status when booking is made
		  car.setStatus("Booked");
		  carRepo.save(car);

		  bookingRepo.save(b);
	    return "Booking Data Inserted Successfully...!!!";
	  }

	  public List<Booking> viewAllBookings() {
	    return bookingRepo.findAll();
	  }

	  public Booking viewBookingById(Long id) {
	    Optional<Booking> booking = bookingRepo.findById(id);
	    return booking.orElse(null);
	  }
	  
	  public List<Booking> findByCustomerId(Long id){
		  List<Booking> bookings = bookingRepo.findByCustomerId(id);
		  return bookings;
	  }

	  public String updateBooking(Long id, Booking booking) {
	    Optional<Booking> existingBooking = bookingRepo.findById(id);
	    
	    if(existingBooking.isPresent()) {
	      Booking existing = existingBooking.get();
	      
	      // Update car status based on booking status
	      Car car = booking.getCar();
	      if (car != null) {
	          if ("Confirmed".equalsIgnoreCase(booking.getStatus())) {
	              car.setStatus("Rented");
	          } else if ("Cancelled".equalsIgnoreCase(booking.getStatus())) {
	              car.setStatus("Available");
	          }
	          carRepo.save(car);
	      }
	      
	      existing.setCar(booking.getCar());
	      existing.setCustomer(booking.getCustomer());
	      existing.setEndDate(booking.getEndDate());
	      existing.setStartDate(booking.getStartDate());
	      existing.setStatus(booking.getStatus());
	      existing.setTotalPrice(booking.getTotalPrice());
	      
	      bookingRepo.save(existing);
	      return "Booking Updated Successfully";
	    }
	    else
	      return "Booking ID Not Found";
	  }

	  public String deleteBooking(Long id) {
	    Optional<Booking> booking = bookingRepo.findById(id);
	    if(booking.isPresent()) {
	      bookingRepo.deleteById(id);
	      return "Booking With ID " + id + " Deleted Successfully...!!!";
	    }
	    else
	      return "Booking ID Not Found";
	  }
}
