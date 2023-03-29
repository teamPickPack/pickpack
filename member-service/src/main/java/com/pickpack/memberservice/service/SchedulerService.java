package com.pickpack.memberservice.service;

import com.pickpack.memberservice.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SchedulerService {

    private final TicketRepository ticketRepository;

    @Scheduled(fixedDelay = 5000)
    public void scheduleRun(){
        System.out.println("hello schedule!!");
    }

}
