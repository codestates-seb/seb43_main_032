package com.main_032.SideQuest.community.entity;

public enum Category {
    PROJECT("프로젝트"),
    ARTICLE("게시글"),
    ANSWER("답변"),
    COMMENT("댓글");

    private final String displayName;

    Category(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {//get
        return displayName;
    }
}

