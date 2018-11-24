package com.bsu.textchat.config;

import com.bsu.textchat.dao.TopicDAO;
import com.bsu.textchat.dao.UserDAO;
import com.bsu.textchat.model.Message;
import com.bsu.textchat.model.Topic;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.util.List;

@Component
public class WebSocketEventListener {

  private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);
  private static final String PREFIX_TOPIC = "/topic/";
  @Autowired private SimpMessageSendingOperations messagingTemplate;
  @Autowired private UserDAO userDAO;
  @Autowired private TopicDAO topicDAO;
  @Autowired private ObjectMapper mapper;

  @EventListener
  public void handleWebSocketSubscribeListener(SessionSubscribeEvent event)
      throws JsonProcessingException {
    StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
    List<String> destinationHeaders = headerAccessor.getNativeHeader("destination");
    if (destinationHeaders != null && destinationHeaders.size() > 0) {
      String destination = destinationHeaders.get(0);
      String content = mapper.writeValueAsString(topicDAO.getAllTopics());
      sendMessage(destination, Message.MessageType.ALL_TOPICS, "app", content);
    }
    for (Topic topic : topicDAO.getAllTopics()) {
      String destination = PREFIX_TOPIC + topic.getTopicId();
      String content = mapper.writeValueAsString(userDAO.getAllUsers());
      sendMessage(destination, Message.MessageType.ALL_USERS, "app", content);
    }
  }

  @EventListener
  public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
    String userName = userDAO.getUserById(event.getSessionId());
    String topicId = topicDAO.getTopicIdByUserName(userName);
    topicDAO.removeUserFromTopic(topicId, userDAO.getUserById(event.getSessionId()));
    userDAO.removeUser(event.getSessionId());
    for (Topic topic : topicDAO.getAllTopics()) {
      String destination = PREFIX_TOPIC + topic.getTopicId();
      sendMessage(destination, Message.MessageType.LEAVE_CHAT, userName);
    }
  }

  private void sendMessage(String destination, Message.MessageType type, String userName) {
    sendMessage(destination, type, userName, null);
  }

  private void sendMessage(
      String destination, Message.MessageType type, String userName, String content) {
    Message message = new Message();
    message.setType(type);
    message.setSender(userName);
    message.setContent(content);

    messagingTemplate.convertAndSend(destination, message);
  }
}
