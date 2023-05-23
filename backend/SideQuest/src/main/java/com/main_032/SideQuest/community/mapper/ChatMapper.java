package com.main_032.SideQuest.community.mapper;


import com.main_032.SideQuest.community.dto.chat.ChatPostDto;
import com.main_032.SideQuest.community.dto.chat.ChatResponseDto;
import com.main_032.SideQuest.community.entity.Chat;
import com.main_032.SideQuest.member.entity.Member;
import org.springframework.stereotype.Component;

@Component
public class ChatMapper {
    public Chat chatpostDtoToChat(ChatPostDto chatPostDto,Long senderMemberId){
        Chat chat = new Chat();
        chat.updatesenderMemberId(senderMemberId);
        chat.updatereceiverMemberId(chatPostDto.getReceiverMemberId());
        chat.updatetitle(chatPostDto.getTitle());
        chat.updatecontent(chatPostDto.getContent());
        return chat;
    }
    public ChatResponseDto chatTochatResponseDto(Chat chat, Member sender){
        ChatResponseDto chatResponseDto = new ChatResponseDto(
                chat.getSenderMemberId(),
                chat.getReceiverMemberId(),
                sender.getEmail(),
                sender.getName(),
                chat.getTitle(),
                chat.getContent(),
                chat.getCreatedAt());
        return chatResponseDto;
    }
}
