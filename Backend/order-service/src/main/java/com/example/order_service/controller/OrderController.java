package com.example.order_service.controller;

import com.example.order_service.data.Order;
import com.example.order_service.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping(path = "/orders")
    public Order createOrder(@RequestParam int userId, @RequestParam int itemId) {
        return orderService.createOrder(userId, itemId);
    }

    @DeleteMapping(path = "/orders/user/{userId}")
    public ResponseEntity<String> deleteOrdersByUserId(@PathVariable int userId) {
        try {
            orderService.deleteOrdersByUserId(userId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete orders.");
        }
    }

    @DeleteMapping(path = "/orders/item/{itemId}")
    public ResponseEntity<String> deleteOrdersByItemId(@PathVariable int itemId) {
        try {
            orderService.deleteOrdersByItemId(itemId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete orders.");
        }
    }

    @DeleteMapping(path = "/orders/{id}")
    public ResponseEntity<String> deleteOrdersById(@PathVariable int id) {
        try {
            orderService.deleteOrdersById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete orders.");
        }
    }

    @GetMapping(path = "/orders/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable int userId) {
        return orderService.findOrderByUserId(userId);
    }

    @GetMapping(path = "/orders")
    public List<Order> findAllOrders() {
        return orderService.getAllOrders();
    }

    @PatchMapping("/orders/{id}")
    public Order updateOrderStatus(
            @PathVariable int id,
            @RequestParam String status) {
        return orderService.updateOrderStatus(id, status);
    }
}
