package com.pickpack.memberservice.config;

import com.pickpack.memberservice.jwt.JwtAuthenticationFilter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Slf4j
@Configuration
public class SecurityConfig {

    /**
     * 암호화 인코더
     * @return
     */
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        log.debug("디버그 : BCryptPasswordEncoder 빈이 등록완료");
        return new BCryptPasswordEncoder();
    }
    
    /**
     * JWT 커스텀 필터를 등록 전에, 필터 생성.
     */
    public class CustomSecurityFilterManager extends AbstractHttpConfigurer<CustomSecurityFilterManager, HttpSecurity>{
        
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            log.info("🎈 커스텀 필터 생성");
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            builder.addFilter(new JwtAuthenticationFilter(authenticationManager));      // 인증 매니저 주입.
            super.configure(builder);
        }
    }

    /**
     * 시큐리티 필터
     * @param http
     * @return
     * @throws Exception
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        log.info("🥽 시큐리티 필터 생성");
        http.headers().frameOptions().disable();
        http.csrf().disable();
        http.cors().configurationSource(configurationSource());

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.formLogin().disable();
        http.httpBasic().disable();

        // 커스텀 필터 등록.
        http.apply(new CustomSecurityFilterManager());

        http.authorizeRequests()
                .antMatchers("/api/**").permitAll()
                .anyRequest().authenticated();

        return http.build();
    }

    /**
     * 시큐리티 필터 cors 처리
     * @return
     */
    public CorsConfigurationSource configurationSource(){
        log.debug("디버그: CorsConfigurationSource cors 설정이 SecurityFilterChain에 등록됨");

        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.addAllowedHeader("*");
        configuration.addExposedHeader("X-AUTH-TOKEN");
//        configuration.addAllowedMethod("*");
//        configuration.addAllowedOriginPattern("*");
//        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

}
