package com.bsu.textchat.dao.impl;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class UserDAO_Impl_InMemoryTest {

	@InjectMocks
	private UserDAO_Impl_InMemory userDao;

	@Test
	public void getAllUsers() {
		assertEquals(0, userDao.getAllUsers().size());
	}

	@Test
	public void addUser() {
		String id = "id";
		String username = "New User";
		assertTrue(userDao.addUser(id, username));
		assertFalse(userDao.addUser(id, username));
		assertEquals(1, userDao.getAllUsers().size());
	}

	@Test
	public void addUser_invalid() {
		String id = "id";
		String username = "New User";
		assertFalse(userDao.addUser(id, ""));
		assertFalse(userDao.addUser(id, null));
		assertFalse(userDao.addUser("", username));
		assertFalse(userDao.addUser(null, username));
		assertFalse(userDao.addUser("", ""));
		assertFalse(userDao.addUser(null, null));
		assertFalse(userDao.addUser(null, ""));
		assertFalse(userDao.addUser("", null));
	}

	@Test
	public void removeUser() {
		userDao.addUser("id", "user");
		assertTrue(userDao.removeUser("id"));
		assertFalse(userDao.removeUser("id not used"));
	}

	@Test
	public void removeUser_invalid() {
		assertFalse(userDao.removeUser(""));
		assertFalse(userDao.removeUser(null));
	}

}
