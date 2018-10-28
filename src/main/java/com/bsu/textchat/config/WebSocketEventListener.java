package com.bsu.textchat.config;

import com.bsu.textchat.dao.UserDAO;
import com.bsu.textchat.model.Message;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Component
public class WebSocketEventListener {

  private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

  @Autowired private SimpMessageSendingOperations messagingTemplate;

  @Autowired private UserDAO userDAO;
  @Autowired private ObjectMapper mapper;

  @EventListener
  public void handleWebSocketConnectListener(SessionSubscribeEvent event)
      throws JsonProcessingException {
    Message infoMsg = new Message();
    infoMsg.setType(Message.MessageType.ALL_USERS);
    infoMsg.setContent(mapper.writeValueAsString(userDAO.getAllUsers()));

    messagingTemplate.convertAndSend("/topic/public", infoMsg);
  }

  @EventListener
  public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
    String userName = userDAO.getUserById(event.getSessionId());
    userDAO.removeUser(event.getSessionId());
    Message chatMessage = new Message();
    chatMessage.setType(Message.MessageType.LEAVE);
    chatMessage.setSender(userName);

    messagingTemplate.convertAndSend("/topic/public", chatMessage);
  }
}
