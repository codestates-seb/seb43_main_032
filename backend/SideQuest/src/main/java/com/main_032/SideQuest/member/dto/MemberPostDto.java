package com.main_032.SideQuest.member.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
@Getter
//@ApiModel(description = "Data Transfer Object for Member Post", value = "MemberPostDto")
public class MemberPostDto {

//    @ApiModelProperty(value = "Member's email", required = true)
    private String email;

//    @ApiModelProperty(value = "Member's name", required = true)
    private String name;

//    @ApiModelProperty(value = "Member's password", required = true)
    private String password;
}
