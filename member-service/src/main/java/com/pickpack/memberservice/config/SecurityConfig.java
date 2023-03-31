//package com.pickpack.memberservice.config;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.cloud.util.ConditionalOnBootstrapEnabled;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//@Slf4j
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public BCryptPasswordEncoder passwordEncoder(){
//        log.debug("디버그 : BCryptPasswordEncoder 빈이 등록완료");
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//        http.headers().frameOptions().disable();
//        http.csrf().disable();
//        http.cors().configurationSource(configurationSource());
//
//        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//        http.formLogin().disable();
//        http.httpBasic().disable();
//        http.authorizeRequests()
//                .antMatchers("/api/**").permitAll()
//                .anyRequest().permitAll();
//
//        return http.build();
//    }
//
//    public CorsConfigurationSource configurationSource(){
//        log.debug("디버그: CorsConfigurationSource cors 설정이 SecurityFilterChain에 등록됨");
//
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.addAllowedHeader("*");
//        configuration.addAllowedMethod("*");
////        configuration.addAllowedOriginPattern("*");
//        configuration.addAllowedHeader("http://localhost:5500");
//        configuration.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//
//        return source;
//    }
//
//}
