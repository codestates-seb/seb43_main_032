package com.main_032.SideQuest.util.dto;

import com.main_032.SideQuest.util.error.ExceptionMsg;
import lombok.Getter;


@Getter
public class SingleResponseDto<T> {
    private T data;
    private ExceptionMsg exceptionMsg = null;

    public SingleResponseDto(T data) {
        this.data = data;
    }

    public SingleResponseDto(T data, ExceptionMsg exceptionMsg) {
        this.data = data;
        this.exceptionMsg = exceptionMsg;
    }
}
