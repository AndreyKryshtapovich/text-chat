package com.bsu.textchat.controller;

import com.bsu.textchat.dao.UserDAO;
import com.bsu.textchat.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

  @Autowired private UserDAO userDAO;

  @MessageMapping("/chat.sendMessage")
  @SendTo("/topic/public")
  public Message sendMessage(@Payload Message message) {
    return message;
  }

  @MessageMapping("/chat.addUser")
  @SendTo("/topic/public")
  public Message addUser(@Payload Message message, SimpMessageHeaderAccessor headerAccessor) {
    userDAO.addUser(headerAccessor.getSessionId(), message.getSender());
    return message;
  }
}
