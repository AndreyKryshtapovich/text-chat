package com.bsu.textchat.dao.impl;

import com.bsu.textchat.dao.TopicDAO;
import com.bsu.textchat.model.Topic;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Component
public class TopicDAO_Impl_InMemory implements TopicDAO {
  private Set<Topic> allTopics;
  private Map<String, Set<String>> topicToUsers = new HashMap<>();

  public TopicDAO_Impl_InMemory() {
    initTopics();
    initTopicToUsersMap();
  }

  @Override
  public void addUserToTopic(String topicId, String userName) {
    Set<String> usersInTopic = topicToUsers.get(topicId);
    if (usersInTopic != null) {
      usersInTopic.add(userName);
    }
  }

  @Override
  public void removeUserFromTopic(String topicId, String userName) {
    Set<String> usersInTopic = topicToUsers.get(topicId);
    if (usersInTopic != null) {
      usersInTopic.remove(userName);
    }
  }

  @Override
  public String getTopicIdByUserName(String userName) {
    for (Map.Entry<String, Set<String>> entry : topicToUsers.entrySet()) {
      if (entry.getValue().contains(userName)) {
        return entry.getKey();
      }
    }
    return "";
  }

  private void initTopicToUsersMap() {
    for (Topic topic : getAllTopics()) {
      topicToUsers.put(topic.getTopicId(), new HashSet<>());
    }
  }

  private void initTopics() {
    Set<Topic> topics = new HashSet<>();
    topics.add(new Topic("public", "Public"));
    topics.add(new Topic("minskCity", "Minsk City"));
    topics.add(new Topic("carEnthusiasts", "Car Enthusiasts"));
    this.allTopics = topics;
  }

  @Override
  public Set<Topic> getAllTopics() {
    return allTopics;
  }
}
