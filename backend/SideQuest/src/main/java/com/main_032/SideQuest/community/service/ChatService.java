package com.main_032.SideQuest.community.service;

import com.main_032.SideQuest.community.dto.chat.ChatPostDto;
import com.main_032.SideQuest.community.dto.chat.ChatResponseDto;
import com.main_032.SideQuest.community.entity.Chat;
import com.main_032.SideQuest.community.mapper.ChatMapper;
import com.main_032.SideQuest.community.repository.ChatRepository;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.repository.MemberRepository;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {
    private final ChatRepository chatRepository;
    private final MemberService memberService;
    private final ChatMapper chatMapper;
    private final MemberRepository memberRepository;

    public ChatService(ChatRepository chatRepository, MemberService memberService, ChatMapper chatMapper, MemberRepository memberRepository) {
        this.chatRepository = chatRepository;
        this.memberService = memberService;
        this.chatMapper = chatMapper;
        this.memberRepository = memberRepository;
    }
    @Transactional
    public void sendMessage(ChatPostDto chatPostDto) {
        Member member = memberService.getLoginMember();
        Chat chat = chatMapper.chatpostDtoToChat(chatPostDto,member.getId());
        Member revicermember =memberService.getMemberById(chat.getReceiverMemberId());
        if(revicermember.getDeleted()==true){
            throw(new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        }
        chatRepository.save(chat);
    }
    @Transactional
    public void deleteMessage(Long chatId) {
        Optional<Chat> findChat = chatRepository.findById(chatId);
        Chat chat = MemberMatch(findChat);
        chat.delete();
        chatRepository.save(chat);
    }



    private Chat MemberMatch(Optional<Chat> findChat) {
        Member member = memberService.getLoginMember();
        Chat chat = findChat.get();
        if(chat.getReceiverMemberId()!=member.getId()){
            throw(new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCH));
        }
        return chat;
    }


    public MultiResponseDto<ChatResponseDto> getAllMessages(int page, int size) {
        Member member =memberService.getLoginMember();
        Page<Chat> chatPage = chatRepository.findAllMyMessages(member.getId(),PageRequest.of(page,size, Sort.by("id").descending()));
        List<Chat> chatList = chatPage.getContent();
        List<ChatResponseDto> chatResponseDtoList = new ArrayList<>();
        for(Chat chat : chatList){
            Member sender = memberService.getMemberById(chat.getSenderMemberId());
            ChatResponseDto chatResponseDto = chatMapper.chatTochatResponseDto(chat,sender);
            chatResponseDtoList.add(chatResponseDto);
        }
        MultiResponseDto<ChatResponseDto> response = new MultiResponseDto<ChatResponseDto>(chatResponseDtoList,chatPage);
        return response;
    }
}