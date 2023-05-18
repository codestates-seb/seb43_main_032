package com.main_032.SideQuest.util.exception;

import lombok.Getter;

public class CustomLogicException extends RuntimeException{
    @Getter
    private ExceptionCode exceptionCode;
    public CustomLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }

}