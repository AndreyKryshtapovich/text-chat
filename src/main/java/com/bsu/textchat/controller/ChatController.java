package com.bsu.textchat.controller;

import com.bsu.textchat.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class ChatController {
  @MessageMapping("/chat.sendMessage")
  @SendTo("/topic/public")
  public Message sendMessage(@Payload Message message) {
    return message;
  }

  @MessageMapping("/chat.addUser")
  @SendTo("/topic/public")
  public Message addUser(@Payload Message message, SimpMessageHeaderAccessor headerAccessor) {
    Map<String, Object> sessionAttrs = headerAccessor.getSessionAttributes();
    if (sessionAttrs != null) {
      sessionAttrs.put("username", message.getSender());
    }
    return message;
  }
}
