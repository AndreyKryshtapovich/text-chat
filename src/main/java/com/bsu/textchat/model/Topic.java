package com.bsu.textchat.model;

public class Topic {
  private String topicId;
  private String displayName;

  public Topic() {}

  public Topic(String topicId, String displayName) {
    this.topicId = topicId;
    this.displayName = displayName;
  }

  public String getTopicId() {
    return topicId;
  }

  public void setTopicId(String topicId) {
    this.topicId = topicId;
  }

  public String getDisplayName() {
    return displayName;
  }

  public void setDisplayName(String displayName) {
    this.displayName = displayName;
  }
}
