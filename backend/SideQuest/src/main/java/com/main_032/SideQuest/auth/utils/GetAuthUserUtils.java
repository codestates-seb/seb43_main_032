package com.main_032.SideQuest.auth.utils;

import com.main_032.SideQuest.global.exception.BusinessLogicException;
import com.main_032.SideQuest.global.exception.ExceptionCode;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class GetAuthUserUtils {
    public static Authentication getAuthUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getName() == null || authentication.getName().equals("anonymousUser")){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        authentication.getPrincipal();
        return authentication;
    }
}
