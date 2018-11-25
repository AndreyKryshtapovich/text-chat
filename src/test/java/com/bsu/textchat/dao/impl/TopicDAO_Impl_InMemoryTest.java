package com.bsu.textchat.dao.impl;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class TopicDAO_Impl_InMemoryTest {

	@InjectMocks
	private TopicDAO_Impl_InMemory topicDao;

	@Test
	public void getAllTopics() {
		assertEquals(3, topicDao.getAllTopics().size());
	}
	
	@Test
	public void addUserToTopic_existingTopic() {
		String username = "New User";
		assertTrue(topicDao.addUserToTopic("public", username));
		assertTrue(topicDao.addUserToTopic("minskCity", username));
		assertTrue(topicDao.addUserToTopic("carEnthusiasts", username));
	}
	
	@Test
	public void addUserToTopic_nonexistingTopic() {
		String topic = "Topic Name";
		String username = "New User";
		assertFalse(topicDao.addUserToTopic(topic, username));
	}

	@Test
	public void addUserToTopic_emptyParams() {
		String topic = "public";
		String username = "New User";
		assertFalse(topicDao.addUserToTopic("", username));
		assertFalse(topicDao.addUserToTopic(null, username));
		assertFalse(topicDao.addUserToTopic(topic, ""));
		assertFalse(topicDao.addUserToTopic(topic, null));
		assertFalse(topicDao.addUserToTopic("", ""));
		assertFalse(topicDao.addUserToTopic(null, null));
		assertFalse(topicDao.addUserToTopic("", null));
		assertFalse(topicDao.addUserToTopic(null, ""));
	}
	
	@Test
	public void removeUserFromTopic_existingTopic_noUser() {
		String topic = "public";
		String username = "New User";
		assertFalse(topicDao.removeUserFromTopic(topic, username));
	}
	
	@Test
	public void removeUserFromTopic_existingTopic_hasUser() {
		String topic = "public";
		String username = "New User";
		topicDao.addUserToTopic(topic, username);
		assertTrue(topicDao.removeUserFromTopic(topic, username));
	}
	
	@Test
	public void removeUserFromTopic_nonexistingTopic() {
		String topic = "Topic Name";
		String username = "New User";
		assertFalse(topicDao.removeUserFromTopic(topic, username));
	}
	
	@Test
	public void removeUserFromTopic_emptyParams() {
		String topic = "public";
		String username = "New User";
		assertFalse(topicDao.removeUserFromTopic("", username));
		assertFalse(topicDao.removeUserFromTopic(null, username));
		assertFalse(topicDao.removeUserFromTopic(topic, ""));
		assertFalse(topicDao.removeUserFromTopic(topic, null));
		assertFalse(topicDao.removeUserFromTopic("", ""));
		assertFalse(topicDao.removeUserFromTopic(null, null));
		assertFalse(topicDao.removeUserFromTopic("", null));
		assertFalse(topicDao.removeUserFromTopic(null, ""));
	}
	
	@Test
	public void getTopicIdByUserName_invalidCases() {
		String username = "New User";
		assertEquals("", topicDao.getTopicIdByUserName(username));
		assertEquals("", topicDao.getTopicIdByUserName(""));
	}
	
	@Test
	public void getTopicIdByUserName_validCases() {
		String topic = "public";
		String username = "New User";
		topicDao.addUserToTopic(topic, username);
		assertEquals(topic, topicDao.getTopicIdByUserName(username));
	}
}
