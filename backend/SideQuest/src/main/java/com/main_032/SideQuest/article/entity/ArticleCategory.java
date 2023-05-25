package com.main_032.SideQuest.article.entity;

public enum ArticleCategory {
    FRONTEND("프론트"),
    BACKEND("백엔드"),
    UIUX("UI/UX"),
    PLANNING("기획"),
    DESIGNER("디자이너"),
    PM("PM"),
    BUSINESS("사업기획"),
    MARKETING("마케팅"),
    ANDROID("안드로이드"),
    IOS("IOS"),
    OTHER("기타");
    private final String displayName;

    ArticleCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {//get
        return displayName;
    }
}
//'프론트엔드',
//        '백엔드',
//        'UI/UX',
//        '기획',
//        '디자이너',
//        'PM',
//        '사업기획',
//        '마케팅',
//        '안드로이드',
//        'IOS',
//        '기타',