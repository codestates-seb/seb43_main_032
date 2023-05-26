package com.main_032.SideQuest.util.advice;

import com.main_032.SideQuest.util.dto.SingleResponseDto;
import com.main_032.SideQuest.util.error.ExceptionMsg;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionAdvice {

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleException(Exception e) {
        log.error("Unknown Exception: {}", e.getMessage());
        return e.getMessage();
    }

    @ExceptionHandler
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public ResponseEntity<SingleResponseDto> handleBusinessLogicException(BusinessLogicException e) {
        ExceptionMsg exceptionMsg = new ExceptionMsg(e.getExceptionCode().getStatus(), e.getExceptionCode().getMessage());
        SingleResponseDto singleResponseDto = new SingleResponseDto(exceptionMsg);
        return new ResponseEntity<>(singleResponseDto, HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }
}
