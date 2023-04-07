//package com.pickpack.memberservice.service;
//
//import com.pickpack.memberservice.entity.Ticket;
//import com.pickpack.memberservice.repository.TicketRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//@RequiredArgsConstructor
//@Slf4j
//public class SchedulerService {
//
//    private final TicketRepository ticketRepository;
//
////    @Scheduled(fixedDelay = 10000)      // 10초
//    public void scheduleRun(){
//
//        // 티켓 가격들 조회
//        System.out.println("hello schedule!!");
//        Optional<Ticket> byId = ticketRepository.findById(1L);
//        System.out.println(byId.get().toString());
//
//
//        // 멤버들의 원하는 가격조회
//
//
//
//        // 원하는 가격 < 티켓 가격일 때 알람서비스
//
//
//
//
//    }
//
//}
