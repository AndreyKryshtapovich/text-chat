package com.bsu.textchat.dao.impl;

import com.bsu.textchat.dao.UserDAO;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class UserDAO_Impl_InMemory implements UserDAO {
	private Map<String, String> users = new ConcurrentHashMap<>();

	@Override
	public boolean addUser(String id, String userName) {
		if (StringUtils.isEmpty(id) || StringUtils.isEmpty(userName)) {
			return false;
		}
		if (users.containsValue(userName)) {
			return false;
		}
		users.put(id, userName);
		return true;
	}

	@Override
	public boolean removeUser(String id) {
		if (StringUtils.isEmpty(id)) {
			return false;
		}
		return users.remove(id) != null;
	}

	@Override
	public String getUserById(String id) {
		return users.get(id);
	}

	@Override
	public List<String> getAllUsers() {
		return new ArrayList<>(users.values());
	}
}
