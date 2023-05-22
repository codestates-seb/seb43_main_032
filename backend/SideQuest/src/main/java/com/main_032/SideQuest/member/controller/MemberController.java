package com.main_032.SideQuest.member.controller;

import com.main_032.SideQuest.member.dto.*;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import com.main_032.SideQuest.util.dto.SingleResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = {"Members"}, description = "멤버 API")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @ApiOperation(value = "회원 가입") //회원가입
    @PostMapping("/members/signup")
    public ResponseEntity<Void> signup(@RequestBody MemberPostDto memberPostDto) {
        memberService.signup(memberPostDto);
        ResponseEntity responseEntity = new ResponseEntity(HttpStatus.OK);
        return responseEntity;
    }

    // Swagger API 뽑아내기용 함수
    @ApiOperation(value = "로그인")
    @PostMapping("/members/login")
    @ResponseStatus(HttpStatus.OK)
    public LoginResponseDto login(@RequestBody LoginPostDto loginPostDto) {
        LoginResponseDto loginResponseDto = new LoginResponseDto();
        return loginResponseDto;
    }

    @ApiOperation(value = "로그인 멤버 정보 조회")
    @GetMapping("/members/info")
    public ResponseEntity<SingleResponseDto<MemberGetResponseDto>> getLoginMemberInfo() {
        SingleResponseDto<MemberGetResponseDto> singleResponseDto = memberService.getLoginMemberInfo();
        ResponseEntity responseEntity = new ResponseEntity<>(singleResponseDto, HttpStatus.OK);
        return responseEntity;
    }

    @ApiOperation(value = "다른 회원 정보 조회")
    @GetMapping("/members/info/{memberId}")
    public ResponseEntity<SingleResponseDto<MemberGetResponseDto>> getMemberInfo(@PathVariable("memberId") Long memberId) {
        SingleResponseDto<MemberGetResponseDto> singleResponseDto = memberService.getMemberInfo(memberId);
        ResponseEntity responseEntity = new ResponseEntity(singleResponseDto, HttpStatus.OK);
        return responseEntity;
    }

    @ApiOperation(value = "멤버 정보 수정")
    @PatchMapping("/members")
    public ResponseEntity<Void> updateMember(@RequestBody MemberPatchDto memberPatchDto) {
        memberService.updateMember(memberPatchDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "멤버 리스트 조회")
    @GetMapping("/members/find-all")
    public ResponseEntity<MultiResponseDto<MemberGetResponseDto>> getAllMembers(@RequestParam int page, @RequestParam int size) {
        MultiResponseDto<MemberGetResponseDto> multiResponseDto = memberService.getAllMembers(page - 1, size);
        ResponseEntity<MultiResponseDto<MemberGetResponseDto>> responseEntity = new ResponseEntity(multiResponseDto, HttpStatus.OK);
        return responseEntity;
    }

    @ApiOperation(value = "멤버 탈퇴")
    @DeleteMapping("/members")
    public ResponseEntity deleteMember() {
        memberService.deleteMember();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "별점 추가")
    @PostMapping("/members/stars")
    public ResponseEntity<Void> plusStar(@RequestBody StarPostDto starPostDto) {
        memberService.plusStar(starPostDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
