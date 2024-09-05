package com.example.warranty_item_service.Service;

import com.example.warranty_item_service.Data.Item;
import com.example.warranty_item_service.Data.ItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public Item uploadItem(int userId, byte[] picture, String description) {
        return itemRepository.save(new Item(userId, picture, description,"Pending"));
    }

    @Transactional
    public void deleteItemsbyUserId(int id) {
        itemRepository.deleteByUserId(id);
    }

    public void deleteItemsById(int id) {
        itemRepository.deleteById(id);
    }

    public List<Item> findItemByUserId(int userId) {
        return itemRepository.findItemsByUserId(userId);
    }
}
