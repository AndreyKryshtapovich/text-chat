package com.bsu.textchat.dao;

import com.bsu.textchat.model.Topic;

import java.util.Set;

public interface TopicDAO {

  void addUserToTopic(String topicId, String userName);

  void removeUserFromTopic(String topicId, String userName);

  String getTopicIdByUserName(String userName);

  Set<Topic> getAllTopics();
}
