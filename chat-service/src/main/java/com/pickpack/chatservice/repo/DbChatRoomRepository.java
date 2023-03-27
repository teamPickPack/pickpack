package com.pickpack.chatservice.repo;

import com.pickpack.chatservice.entity.ChatRoom;
import com.pickpack.chatservice.entity.Item;
import com.pickpack.chatservice.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.*;
import java.util.List;

public interface DbChatRoomRepository extends JpaRepository<ChatRoom, String> {
    //TODO DTO작업은 추후에..
    @Query(nativeQuery = true, value =
            "SELECT room_id, item_id,seller_name,buyer_name,message_size,last_message,is_new " +
                    "FROM chat_room as cr LEFT OUTER JOIN soldout as out ON cr.item_id=out.item_id " +
            "WHERE out.soldout_id IS NOT NULL")
    List<ChatRoom> findAllValidRooms();
}
