package com.bsu.textchat.dao;

import com.bsu.textchat.model.Topic;

import java.util.Set;

public interface TopicDAO {

  boolean addUserToTopic(String topicId, String userName);

  boolean removeUserFromTopic(String topicId, String userName);

  String getTopicIdByUserName(String userName);

  Set<Topic> getAllTopics();
}
