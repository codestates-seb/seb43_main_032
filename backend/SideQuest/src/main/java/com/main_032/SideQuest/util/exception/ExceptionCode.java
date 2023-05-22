package com.main_032.SideQuest.util.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
@Getter
@AllArgsConstructor
public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EMAIL_EXISTS(409, "Member email exists"),
    MEMBER_NAME_EXISTS(409, "Member name exists"),
    MEMBER_NOT_MATCH(404, "Member does not match"),

    INVALID_REQUEST(400, "Do not have authentication"),
    INVALID_PERMISSION(400, "Can not use permission"),

    ANSWER_NOT_FOUND(404, "Answer not found"),

    COMMENT_NOT_FOUND(404, "Comment not found"),

    ARTICLE_NOT_FOUND(404, "Article not found"),

    PROJECT_NOT_FOUND(404, "Project not found"),
    ALREADY_APPLY_PROJECT(409, "Already apply project"),

    POSITION_NOT_FOUND(404, "Position not found"),
    APPLY_CREW_NOT_FOUND(404, "Apply crew not found"),
    APPLY_CREW_POSITION_NOT_MATCH(404, "Apply crew position not match"),

    LIKES_NOT_FOUND(404, "Likes not found");
    // 400 : invalid
    // 404 : not found
    // 409 already exists

    private int status;
    private String message;

/*    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }*/
}
