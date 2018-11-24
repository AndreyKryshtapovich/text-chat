package com.bsu.textchat.model;

public class Message {

  private MessageType type;
  private String content;
  private String sender;
  private String topic;

  public MessageType getType() {
    return type;
  }

  public void setType(MessageType type) {
    this.type = type;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getSender() {
    return sender;
  }

  public void setSender(String sender) {
    this.sender = sender;
  }

  public String getTopic() {
    return topic;
  }

  public void setTopic(String topic) {
    this.topic = topic;
  }

  public enum MessageType {
    CHAT,
    JOIN,
    LEAVE_CHAT,
    LEAVE_TOPIC,
    ALL_USERS,
    ALL_TOPICS
  }
}
