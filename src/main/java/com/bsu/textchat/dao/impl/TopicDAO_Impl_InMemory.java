package com.bsu.textchat.dao.impl;

import com.bsu.textchat.dao.TopicDAO;
import com.bsu.textchat.model.Topic;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

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
	public boolean addUserToTopic(String topicId, String userName) {
		if (StringUtils.isEmpty(topicId) || StringUtils.isEmpty(userName)) {
			return false;
		}
		Set<String> usersInTopic = topicToUsers.get(topicId);
		if (usersInTopic != null) {
			return usersInTopic.add(userName);
		}
		return false;
	}

	@Override
	public boolean removeUserFromTopic(String topicId, String userName) {
		if (StringUtils.isEmpty(topicId) || StringUtils.isEmpty(userName)) {
			return false;
		}
		Set<String> usersInTopic = topicToUsers.get(topicId);
		if (usersInTopic != null) {
			return usersInTopic.remove(userName);
		}
		return false;
	}

	@Override
	public String getTopicIdByUserName(String userName) {
		if (StringUtils.isEmpty(userName)) {
			return "";
		}
				
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
