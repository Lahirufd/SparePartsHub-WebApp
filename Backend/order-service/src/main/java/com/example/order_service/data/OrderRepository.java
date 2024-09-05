package com.example.order_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Modifying
    @Query("DELETE FROM Order o WHERE o.userId = :userId")
    void deleteByUserId(@Param("userId") int userId);

    @Modifying
    @Query("DELETE FROM Order o WHERE o.itemId = :itemId")
    void deleteByItemId(@Param("itemId") int itemId);

    @Query("SELECT o FROM Order o WHERE o.userId = :userId")
    List<Order> findOrdersByUserId(@Param("userId") int userId);

}
