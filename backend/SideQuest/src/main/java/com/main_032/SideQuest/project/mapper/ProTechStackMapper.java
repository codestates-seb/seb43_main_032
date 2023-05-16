package com.main_032.SideQuest.project.mapper;

import com.main_032.SideQuest.project.dto.ProTechStackPostDto;
import com.main_032.SideQuest.project.entity.ProTechStack;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProTechStackMapper {

    public List<ProTechStack> proTechStackPostDtoToProTechStackList
            (ProTechStackPostDto proTechStackPostDto, Long projectId) {


        List<ProTechStack> proTechStackList = new ArrayList<>();
        for (int i = 0; i < proTechStackPostDto.getTechStackList().size(); i++) {

            ProTechStack proTechStack = new ProTechStack(projectId,
                    proTechStackPostDto.getTechStackList().get(i));
            proTechStackList.add(proTechStack);
        }

        return proTechStackList;

    }

}
/*
프로젝트 하나를 Post 하기위해 클라이언트로부터 입력받는 데이터로는 protechstack을 추가할 수 없다.
프로젝튼id값을 입력받지 않아서, proService에서 프로젝트를 하나 받은 정보로 생성, 생성한 프로젝트는 id 값 가짐
그럼 그 id 값으로 연관된 애들 만들어서 db에 넣어줌,
근데 protechstack을 클라로부터 입력받을때 StringList로받는데 이걸 protechstack 객체로 만들어서 리스트로 합쳐서 내보내주는 함수
이 함수로
 */
