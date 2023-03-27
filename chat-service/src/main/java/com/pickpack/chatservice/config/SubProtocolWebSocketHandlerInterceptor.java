package com.pickpack.chatservice.config;


import org.aopalliance.intercept.MethodInvocation;
import org.springframework.aop.support.DelegatingIntroductionInterceptor;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.WebSocketSession;

public class SubProtocolWebSocketHandlerInterceptor extends DelegatingIntroductionInterceptor {


    @Override
    protected Object doProceed(MethodInvocation mi) throws Throwable {
        if(mi.getMethod().getName().equals("afterConnectionEstablished") ) {
            System.out.println(mi.getArguments()[0]);
            WebSocketSession session = (WebSocketSession) mi.getArguments()[0];
            session.setTextMessageSizeLimit(500*1024*1024);
        }
        return super.doProceed(mi);
    }
}