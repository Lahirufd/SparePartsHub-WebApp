package com.example.order_service.service;

import com.example.order_service.data.Order;
import com.example.order_service.data.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(int userId, int itemId) {
        return orderRepository.save(new Order(userId, itemId, "Pending"));
    }

    @Transactional
    public void deleteOrdersByUserId(int userId) {
        orderRepository.deleteByUserId(userId);
    }

    @Transactional
    public void deleteOrdersByItemId(int itemId) {
        orderRepository.deleteByItemId(itemId);
    }

    public void deleteOrdersById(int id) {
        orderRepository.deleteById(id);
    }

    public List<Order> findOrderByUserId(int userId) {
        return orderRepository.findOrdersByUserId(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrder(Integer Id, Order updatedOrder) {
        Order existingOrder = orderRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        existingOrder.setStatus(updatedOrder.getStatus());

        return orderRepository.save(existingOrder);
    }
}