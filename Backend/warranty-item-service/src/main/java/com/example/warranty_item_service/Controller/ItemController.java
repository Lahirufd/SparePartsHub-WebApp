package com.example.warranty_item_service.Controller;

import com.example.warranty_item_service.Data.Item;
import com.example.warranty_item_service.Service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ItemController {

    @Autowired
    ItemService itemService;

    @PostMapping(path = "/items")
    public Item uploadItem(
            @RequestParam int userId,
            @RequestParam MultipartFile picture,
            @RequestParam String description) throws IOException {

        return itemService.uploadItem(userId, picture.getBytes(), description);
    }

    @DeleteMapping(path = "/items/user/{userId}")
    public ResponseEntity<String> deleteItemsByUserId(@PathVariable int userId) {
        try {
            itemService.deleteItemsbyUserId(userId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete warranty items.");
        }
    }

    @DeleteMapping(path = "/items/{id}")
    public ResponseEntity<String> deleteItemsById(@PathVariable int id) {
        try {
            itemService.deleteItemsById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete warranty item.");
        }
    }

    @GetMapping(path = "/items/{userId}")
    public List<Item> getItemsByUserId(@PathVariable int userId) {
        return itemService.findItemByUserId(userId);
    }

    @GetMapping(path = "/items")
    public List<Item> viewAllItems() {
        return itemService.getAllItems();
    }

    @PatchMapping("/items/{id}")
    public Item updateItemStatus(
            @PathVariable int id,
            @RequestParam String status) {
        return itemService.updateItemStatus(id, status);
    }
}
