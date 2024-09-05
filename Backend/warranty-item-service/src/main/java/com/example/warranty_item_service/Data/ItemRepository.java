package com.example.warranty_item_service.Data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {

    @Modifying
    @Query("DELETE FROM Item i WHERE i.userId = :userId")
    void deleteByUserId(@Param("userId") int userId);

    @Query("SELECT i FROM Item i WHERE i.userId = :userId")
    List<Item> findItemsByUserId(@Param("userId") int userId);
}
