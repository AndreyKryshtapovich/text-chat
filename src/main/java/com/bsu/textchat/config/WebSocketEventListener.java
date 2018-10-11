package com.bsu.textchat.config;

import com.bsu.textchat.model.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Map;

@Component
public class WebSocketEventListener {

  private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

  @Autowired private SimpMessageSendingOperations messagingTemplate;

  @EventListener
  public void handleWebSocketConnectListener(SessionConnectedEvent event) {
    logger.info("Received a new web socket connection");
  }

  @EventListener
  public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
    StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
    Map<String, Object> sessionAttrs = headerAccessor.getSessionAttributes();
    if (sessionAttrs == null) {
      return;
    }
    String username = (String) sessionAttrs.get("username");
    if (username == null) {
      return;
    }
    logger.info("User Disconnected : " + username);

    Message chatMessage = new Message();
    chatMessage.setType(Message.MessageType.LEAVE);
    chatMessage.setSender(username);

    messagingTemplate.convertAndSend("/topic/public", chatMessage);
  }
}
