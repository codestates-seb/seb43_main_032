package com.main_032.SideQuest.community.entity.entity;

public enum Category {
    CATEGORY_1("프로젝트"),
    CATEGORY_2("게시글"),
    CATEGORY_3("답변"),
    CATEGORY_4("댓글");

    private final String displayName;

    Category(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {//get
        return displayName;
    }


}

