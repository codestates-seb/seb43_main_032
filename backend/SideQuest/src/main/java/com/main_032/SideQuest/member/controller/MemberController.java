package com.main_032.SideQuest.member.controller;

import com.main_032.SideQuest.member.dto.GetLoginMemberResponseDto;
import com.main_032.SideQuest.member.dto.MemberPostDto;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.util.dto.SingleResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = {"Member"}, description = "멤버 API")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @ApiOperation(value = "회원 가입") //회원가입
    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody MemberPostDto memberPostDto) {
        memberService.signup(memberPostDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation(value = "로그인 멤버 정보 조회")
    @GetMapping("/member")
    public ResponseEntity<SingleResponseDto<GetLoginMemberResponseDto>> getLoginMemberInfo() {
        SingleResponseDto<GetLoginMemberResponseDto> singleResponseDto = memberService.getLoginMemberInfo();
        return new ResponseEntity<SingleResponseDto<GetLoginMemberResponseDto>>(singleResponseDto, HttpStatus.OK);
    }
}
