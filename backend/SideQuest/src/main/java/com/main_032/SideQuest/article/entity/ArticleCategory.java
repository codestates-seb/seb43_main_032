package com.main_032.SideQuest.article.entity;

public enum ArticleCategory {
    FRONT_END("프론트"),
    BACK_END("백엔드"),
    UI_UX("UI/UX");
    private final String displayName;

    ArticleCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {//get
        return displayName;
    }
}
