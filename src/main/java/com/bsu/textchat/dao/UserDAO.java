package com.bsu.textchat.dao;

import java.util.List;

public interface UserDAO {
  void addUser(String id, String userName);

  String getUserById(String id);

  List<String> getAllUsers();

  void removeUser(String id);
}
