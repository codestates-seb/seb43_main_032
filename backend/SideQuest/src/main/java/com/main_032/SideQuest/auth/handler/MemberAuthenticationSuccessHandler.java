package com.main_032.SideQuest.auth.handler;

import com.google.gson.JsonObject;
import com.main_032.SideQuest.domain.member.repository.MemberRepository;
import com.main_032.SideQuest.global.exception.BusinessLogicException;
import com.main_032.SideQuest.global.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    MemberRepository memberRepository;

    public MemberAuthenticationSuccessHandler(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        Optional<Member> findMember = memberRepository.findByEmail(authentication.getName());
        Member member = findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        String username = member.getName();

        response.setStatus(HttpStatus.ACCEPTED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding(StandardCharsets.UTF_8.toString());

        try(PrintWriter writer = response.getWriter()){
            JsonObject json = new JsonObject();
            json.addProperty("username", username);     // 멤버 이름 추가 해주는 부분
            writer.write(json.toString());
        }
    }
}
