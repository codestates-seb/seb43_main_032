package com.main_032.SideQuest.util.exception;

import lombok.Getter;

public enum ExceptionCode {
    FILE_NOT_SUPPORTED(400,"File type not supported"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EMAIL_EXISTS(409, "Member email exists"),
    MEMBER_NAME_EXISTS(409, "Member name exists"),
    MEMBER_NOT_MATCH(404, "Member does not match"),
    INVALID_REQUEST(404, "Do not have authentication"),
    INVALID_PERMISSION(404, "Can not use permission"),
    ANSWER_NOT_FOUND(404, "Answer not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    ARTICLE_NOT_FOUND(404, "Article not found"),
    PROJECT_NOT_FOUND(404, "Project not found");
    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
