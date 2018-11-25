package com.bsu.textchat.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import com.bsu.textchat.dao.UserDAO;

@Component
public class UserDAO_Impl_InMemory implements UserDAO {
	private Map<String, String> users = new ConcurrentHashMap<>();

	@Override
	public boolean addUser(String id, String userName) {
		boolean isFree = !users.containsValue(userName);
		if (isFree) {
			users.put(id, userName);
		}
		return isFree;
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
