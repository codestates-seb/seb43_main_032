package com.main_032.SideQuest.project.entity;

public enum ProjectStatus {
    PROJECT_STATUS_1("모집 중"),
    PROJECT_STATUS_2("모집 완료"),
    PROJECT_STATUS_3("진행 중"),
    PROJECT_STATUS_4("완료");

    private final String displayName;

    ProjectStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
