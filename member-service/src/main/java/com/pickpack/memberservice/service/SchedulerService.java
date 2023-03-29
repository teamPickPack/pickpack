package com.pickpack.memberservice.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class SchedulerService {

    @Scheduled(fixedDelay = 5000)
    public void scheduleRun(){
        System.out.println("hello schedule!!");
    }

}
