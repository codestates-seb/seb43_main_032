package com.main_032.SideQuest.community.repository;

import com.main_032.SideQuest.community.entity.Chat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChatRepository extends JpaRepository<Chat,Long> {

    @Query("SELECT ch FROM Chat ch WHERE ch.receiverMemberId = :receiverMemberId AND ch.deleted = 0")
    Page<Chat> findAllMyMessages(Long receiverMemberId, Pageable pageable);
}
