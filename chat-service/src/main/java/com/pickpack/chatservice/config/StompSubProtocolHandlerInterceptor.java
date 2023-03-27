//package com.pickpack.chatservice.config;
//
//import org.aopalliance.intercept.MethodInvocation;
//import org.springframework.aop.support.DelegatingIntroductionInterceptor;
//import org.springframework.context.annotation.Configuration;
//
//public class StompSubProtocolHandlerInterceptor extends DelegatingIntroductionInterceptor {
//
//    @Override
//    protected Object doProceed(MethodInvocation mi) throws Throwable {
//        if (mi.getMethod().getName().equals("getMessageSizeLimit")) {
//            System.out.println(mi.getArguments()[0]);
////            WebSocketSession session = (WebSocketSession) mi.getArguments()[0];
////
////            session.setTextMessageSizeLimit(500 * 1024 * 1024);
//        }
//        return SubProtocolWebSocketHandlerInterceptor.doProceed(mi);
//    }
////
////    private final int bufferSizeLimit = 1024 * 1024 * 500;
////    private final Map<String, BufferingStompDecoder> decoders = new ConcurrentHashMap<>();
////    private StompDecoder stompDecoder = new StompDecoder();
//}
