package com.pickpack.chatservice.repo.redis;

import com.pickpack.chatservice.entity.redis.RedisChatRoom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.cache.CacheProperties;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ParameterizedPreparedStatementSetter;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

@RequiredArgsConstructor
@Slf4j
@Service
public class RedisChatRoomRepository {

    private final String CHAT_ROOMS = "CHAT_ROOM";
    private final RedisTemplate<String, Object> redisTemplate;
    private final JdbcTemplate jdbcTemplate;
    private HashOperations<String, String, List<RedisChatRoom>> opsHashChatRoom;

    @PostConstruct
    private void init() {
        opsHashChatRoom =redisTemplate.opsForHash();
    }

    //Redis에 room삽입

    public boolean isHasKeyOnChatRoom(String nickname) {
        return opsHashChatRoom.hasKey(CHAT_ROOMS, nickname);
    }

    /**
     * 이 닉네임이 참여한 채팅방들 가져오기
     *
     * @param nickname
     * @return List - RedisChatRoom
     */
    public List<RedisChatRoom> findRoomsByNickname(String nickname) {
        log.info("nickname: {}", nickname);
        List<RedisChatRoom> list = opsHashChatRoom.get(CHAT_ROOMS,nickname);
        List<RedisChatRoom> nickname1list = opsHashChatRoom.get(CHAT_ROOMS,"nickname1");
        for(RedisChatRoom redisChatRoom : nickname1list){
            System.out.println(redisChatRoom.getRoomId());
        }
        for(RedisChatRoom redisChatRoom : list){
            System.out.println(redisChatRoom.getRoomId());
        }
        log.info("끝");
        return opsHashChatRoom.get(CHAT_ROOMS, nickname);
    }


    /**
     * 이 닉네임의 채팅방 리스트들을 저장하기
     *
     * @param nickname
     * @param redisChatRoomList
     */

    public void saveRoomList(String nickname, List<RedisChatRoom> redisChatRoomList) {
        opsHashChatRoom.put(CHAT_ROOMS, nickname, redisChatRoomList);
    }

    /**
     * Map<닉네임,채팅방 리스트>를 저장하기
     *
     * @param redisChatRoomMap
     */
    public void saveRoomsMap(Map<String, List<RedisChatRoom>> redisChatRoomMap) {
        opsHashChatRoom.putAll(CHAT_ROOMS, redisChatRoomMap);
    }

    /**
     * 모든 Map<닉네임,채팅방 리스트> 가져오기
     *
     * @return
     */
    public Map<String, List<RedisChatRoom>> findAllRoomByKey() {
        return opsHashChatRoom.entries(CHAT_ROOMS);
    }

    /**
     * 모든 RedisChatRoom 삭제하기
     */
    public void deleteAllRoom() {
        redisTemplate.delete(CHAT_ROOMS);
    }

    public void updateRoomTime(String nickname, String roomId, LocalDateTime time, boolean flag) {
        List<RedisChatRoom> redisChatRoomList = findRoomsByNickname(nickname);

        System.out.println("^^^^^^^^^^^^^^^^^^?");
        for (RedisChatRoom redisChatRoom : redisChatRoomList) {
            if (redisChatRoom.getRoomId().equals(roomId)) {
                log.info("flag : {}", flag);
                log.info("redisChatRoom의 update 전 : {}",redisChatRoom.getLastMessageTime());
                redisChatRoom.updateTime(time);
                log.info("redisChatRoom의 update 후 : {}",redisChatRoom.getLastMessageTime());
                if (!flag) {
                    if (redisChatRoom.getBuyer().equals(nickname)) {
                        updateRoomTime(redisChatRoom.getSeller(), roomId, time, true);
                    } else {
                        updateRoomTime(redisChatRoom.getBuyer(), roomId, time, true);
                    }
                }
                break;
            }
        }
        saveRoomList(nickname, redisChatRoomList);
    }

    /**
     * RedisChatRoom(Redis) -> ChatRoom(MySQL)
     *
     * @param allRoomList
     * @return
     */
    public int[][] writeRoomFromRedisToDB(List<RedisChatRoom> allRoomList) {
        return jdbcTemplate.batchUpdate
                ("INSERT INTO chat_room(room_id,item_id,seller,buyer,message_size,last_message,is_new,recent_time) VALUES (?,?,?,?,?,?,?,?)" +
                                "ON DUPLICATE KEY UPDATE message_size=VALUES(message_size) ,last_message=VALUES(last_message),is_new=VALUES(is_new)," +
                                "recent_time=VALUES(recent_time) ;",
                        allRoomList,
                        allRoomList.size(),
                        new ParameterizedPreparedStatementSetter<RedisChatRoom>() {
                            @Override
                            public void setValues(PreparedStatement ps, RedisChatRoom chatRoom) throws SQLException {
                                ps.setString(1, chatRoom.getRoomId());
                                ps.setLong(2, chatRoom.getItemId());
                                ps.setString(3, chatRoom.getSeller());
                                ps.setString(4, chatRoom.getBuyer());
                                ps.setInt(5, chatRoom.getMessageSize());
                                ps.setString(6, chatRoom.getLastMessage());
                                ps.setBoolean(7, chatRoom.isNew());
                                ps.setTimestamp(8, Timestamp.valueOf(chatRoom.getLastMessageTime()));
                            }
                        }
                );
    }
}
