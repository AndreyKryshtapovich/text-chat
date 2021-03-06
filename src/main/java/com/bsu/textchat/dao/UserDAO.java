package com.bsu.textchat.dao;

import java.util.List;

public interface UserDAO {
	
	boolean addUser(String id, String userName);

	boolean removeUser(String id);

  String getUserById(String id);

  List<String> getAllUsers();

}
