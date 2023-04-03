package com.pickpack.memberservice.repository.redisRepository;

import com.pickpack.memberservice.entity.Ticket;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.repository.CrudRepository;

@EnableRedisRepositories
public interface TicketRedisRepository extends CrudRepository<Ticket, Long> {
}
