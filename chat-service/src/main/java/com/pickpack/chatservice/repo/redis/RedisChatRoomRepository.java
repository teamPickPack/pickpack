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

    //optional 처리로 필요없을듯
//
//    public boolean isHasKeyOnChatRoom(String nickname) {
//        return opsHashChatRoom.hasKey(CHAT_ROOMS, nickname);
//    }

    public Optional<List<RedisChatRoom>> findRoomsByNickname(String nickname) {
        return Optional.ofNullable(opsHashChatRoom.get(CHAT_ROOMS, nickname));
    }

    public void saveRoomList(String nickname, List<RedisChatRoom> redisChatRoomList) {
        opsHashChatRoom.put(CHAT_ROOMS, nickname, redisChatRoomList);
    }

    public void saveRoomsMap(Map<String, List<RedisChatRoom>> redisChatRoomMap) {
        opsHashChatRoom.putAll(CHAT_ROOMS, redisChatRoomMap);
    }

    public Optional<Map<String, List<RedisChatRoom>>> findAllRoomByKey() {
        return Optional.of(opsHashChatRoom.entries(CHAT_ROOMS));
    }

    public void deleteAllRoom() {
        redisTemplate.delete(CHAT_ROOMS);
    }

    public void updateRoomTime(String nickname, String roomId, LocalDateTime time, boolean flag) {
        List<RedisChatRoom> redisChatRoomList = findRoomsByNickname(nickname)
                .orElseGet(ArrayList::new);

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
