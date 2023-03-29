package com.pickpack.chatservice.repo;

import com.pickpack.chatservice.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {
    //TODO DTO작업은 추후에..
    @Query(nativeQuery = true, value =
            "SELECT room_id, cr.item_id,seller,buyer,message_size,last_message,is_new " +
                    "FROM chat_room as cr LEFT OUTER JOIN soldout as so ON cr.item_id=so.item_id " +
                    "WHERE so.soldout_id IS NULL")
    List<ChatRoom> findAllValidRooms();
}
