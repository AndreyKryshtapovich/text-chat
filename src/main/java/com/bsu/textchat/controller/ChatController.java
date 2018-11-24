package com.bsu.textchat.controller;

import com.bsu.textchat.dao.TopicDAO;
import com.bsu.textchat.dao.UserDAO;
import com.bsu.textchat.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

  @Autowired private UserDAO userDAO;
  @Autowired private SimpMessageSendingOperations messagingTemplate;
  @Autowired private TopicDAO topicDAO;

  @MessageMapping("/chat.sendMessage")
  public void sendMessage(@Payload Message message) {
    messagingTemplate.convertAndSend(message.getTopic(), message);
  }

  @MessageMapping("/chat.addUser")
  public void addUser(@Payload Message message, SimpMessageHeaderAccessor headerAccessor) {
    String userName = message.getSender();
    String topic = message.getTopic();
    String topicId = topic.substring(topic.lastIndexOf("/") + 1);
    userDAO.addUser(headerAccessor.getSessionId(), userName);
    topicDAO.addUserToTopic(topicId, userName);
    messagingTemplate.convertAndSend(topic, message);
  }
}
