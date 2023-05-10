package com.main_032.SideQuest.article.entity;

public enum ArticleCategory {
    CATEGORY_1("프론트"),
    CATEGORY_2("백엔드"),
    CATEGORY_3("UI/UX");
    private final String displayName;

    ArticleCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {//get
        return displayName;
    }
}
