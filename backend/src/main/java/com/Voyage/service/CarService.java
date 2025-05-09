package com.Voyage.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Voyage.model.Car;
import com.Voyage.repository.CarRepository;

@Service
public class CarService {

	  @Autowired
	  private CarRepository carRepo;
	  
	  public String addCar(Car c) {
	    carRepo.save(c);
	    return "Car Data Inserted Successfully...!!!";
	  }

	  public List<Car> viewAllCars() {
	    return carRepo.findAll();
	  }

	  public Car viewCarById(Long id) {
	    Optional<Car> car = carRepo.findById(id);
	    return car.orElse(null);
	  }

	  public String updateCar(Long id, Car car) {
	    Optional<Car> existingCar = carRepo.findById(id);
	    
	    if(existingCar.isPresent()) {
	      Car existing = existingCar.get();
	      existing.setName(car.getName());
	      existing.setBrand(car.getBrand());
	      existing.setType(car.getType());
	      existing.setColor(car.getColor());
	      existing.setFuelType(car.getFuelType());
	      existing.setImage(car.getImage());
	      existing.setPrice(car.getPrice());
	      existing.setStatus(car.getStatus());
	      existing.setOwner(car.getOwner());
	      
	      carRepo.save(existing);
	      return "Car details Updated Successfully";
	    }
	    else
	      return "Car ID Not Found";
	  }

	  public String deleteCar(Long id) {
	    Optional<Car> car = carRepo.findById(id);
	    if(car.isPresent()) {
	      carRepo.deleteById(id);
	      return "Car With ID " + id + " Deleted Successfully...!!!";
	    }
	    else
	      return "Car ID Not Found";
	  }
	  
	  public List<Car> findByOwnerId(Long id){
		  List<Car> cars = carRepo.findByOwnerId(id);
		  return cars;
	  }
}