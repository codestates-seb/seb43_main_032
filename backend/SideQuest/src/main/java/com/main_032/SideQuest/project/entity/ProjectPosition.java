package com.main_032.SideQuest.project.entity;

public enum ProjectPosition {
    PROJECT_POSITION_1(""),
    PROJECT_POSITION_2(""),
    PROJECT_POSITION_3(""),
    PROJECT_POSITION_4(""),
    PROJECT_POSITION_5(""),
    PROJECT_POSITION_6(""),
    PROJECT_POSITION_7(""),
    PROJECT_POSITION_8(""),
    PROJECT_POSITION_9(""),
    PROJECT_POSITION_10("");

    private final String displayName;

    ProjectPosition(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
