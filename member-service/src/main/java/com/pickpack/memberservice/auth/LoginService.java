package com.pickpack.memberservice.auth;

//import com.netflix.discovery.converters.Auto;
import com.pickpack.memberservice.entity.Member;
import com.pickpack.memberservice.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class LoginService implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    // 실제 DB에 존재하는 네임인지 판별 -> 내가 직접 찾는 함수 넣어줘야함.
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member memberPS = memberRepository.findByMid(username).orElseThrow(
                () -> new InternalAuthenticationServiceException("인증 실패")
        );
        return new LoginUser(memberPS);
    }
}
