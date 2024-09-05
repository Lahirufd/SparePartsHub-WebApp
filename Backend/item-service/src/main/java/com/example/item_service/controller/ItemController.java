package com.example.item_service.controller;

import com.example.item_service.data.Item;
import com.example.item_service.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping(path = "/items")
    public Item uploadItem(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam MultipartFile picture) throws IOException {

        return itemService.uploadItem(name, description, picture.getBytes());
    }

    @PutMapping(path = "/items/{id}")
    public Item editItem(
            @PathVariable int id,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam MultipartFile picture) throws IOException {

        return itemService.editItem(id, name, description, picture.getBytes());
    }


    @GetMapping(path = "/items")
    public List<Item> viewAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping(path = "/items", params = "name")
    public List<Item> findItemByName(@RequestParam String name) {
        return itemService.searchItemByName(name);
    }

    @GetMapping(path = "/items/{id}")
    public Item getItemById(@PathVariable int id) {
        return itemService.getItemById(id);
    }

    @DeleteMapping(path = "/items/{id}")
    public ResponseEntity<String> deleteItemById(@PathVariable int id) {
        boolean isDeleted = itemService.deleteItemById(id);

        if (isDeleted) {
            return ResponseEntity.ok("Item deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("Item not found.");
        }
    }

}
