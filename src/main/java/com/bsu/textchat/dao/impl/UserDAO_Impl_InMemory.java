package com.bsu.textchat.dao.impl;

import com.bsu.textchat.dao.UserDAO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class UserDAO_Impl_InMemory implements UserDAO {
  private Map<String, String> users = new ConcurrentHashMap<>();

  @Override
  public void addUser(String id, String userName) {
    users.put(id, userName);
  }

  @Override
  public String getUserById(String id) {
    return users.get(id);
  }

  @Override
  public List<String> getAllUsers() {
    return new ArrayList<>(users.values());
  }

  @Override
  public void removeUser(String id) {
    users.remove(id);
  }
}
