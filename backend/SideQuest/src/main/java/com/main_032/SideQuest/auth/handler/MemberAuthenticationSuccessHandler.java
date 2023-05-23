package com.main_032.SideQuest.auth.handler;

import com.google.gson.JsonObject;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.repository.MemberRepository;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
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

@RequiredArgsConstructor
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        Optional<Member> findMember = memberRepository.findByEmail(authentication.getName());
        Member member = findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        String name = member.getName();
        String email = member.getEmail();
        String phone = member.getPhone();
        String aboutMe = member.getAboutMe();
        String profileImageUrl = member.getProfileImageUrl();
        String position = member.getPosition();
        int yearOfDev = member.getYearOfDev();
        int totalStar = member.getTotalStar();

        response.setStatus(HttpStatus.ACCEPTED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding(StandardCharsets.UTF_8.toString());

        try(PrintWriter writer = response.getWriter()){
            JsonObject json = new JsonObject();
            json.addProperty("name", name);     // 멤버 이름 추가 해주는 부분
            json.addProperty("email", email);
            json.addProperty("phone", phone);
            json.addProperty("aboutMe", aboutMe);
            json.addProperty("profileImageUrl", profileImageUrl);
            json.addProperty("position", position);
            json.addProperty("yearOfDev", yearOfDev);
            json.addProperty("totalStar", totalStar);
            writer.write(json.toString());
        }
    }
}
