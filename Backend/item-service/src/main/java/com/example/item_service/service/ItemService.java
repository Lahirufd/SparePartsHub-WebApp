package com.example.item_service.service;

import com.example.item_service.data.Item;
import com.example.item_service.data.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public Item uploadItem(String name, String description, byte[] picture) {
        return itemRepository.save(new Item(name, description, picture));
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Item editItem(int id, String name, String description, byte[] picture) {
        Item existingItem = itemRepository.findById(id).orElse(null);

        if (existingItem == null) {
            return null;
        }

        existingItem.setName(name);
        existingItem.setDescription(description);
        existingItem.setPicture(picture);

        return itemRepository.save(existingItem);
    }


    public List<Item> searchItemByName(String name) {
        return itemRepository.findByName(name);
    }

    public Item getItemById(int id) {
        Optional<Item> item = itemRepository.findById(id);
        if (item.isPresent()) {
            return item.get();
        }
        return null;
    }

    public boolean deleteItemById(int id) {
        Optional<Item> item = itemRepository.findById(id);
        if (item.isPresent()) {
            itemRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
