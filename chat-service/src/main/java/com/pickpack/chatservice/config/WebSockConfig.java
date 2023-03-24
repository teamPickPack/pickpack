package com.pickpack.chatservice.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@EnableWebSocketMessageBroker
public class WebSockConfig implements WebSocketMessageBrokerConfigurer {
    @Autowired
    private AgentWebSocketHandlerDecoratorFactory agentWebSocketHandlerDecoratorFactory;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/sub");
        config.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-stomp").setAllowedOriginPatterns("*");
//                .withSockJS();
    }

    //TODO 안 먹음
    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
        registration.setDecoratorFactories(agentWebSocketHandlerDecoratorFactory);
        registration.setSendBufferSizeLimit(512*1024*1024);
    }
}